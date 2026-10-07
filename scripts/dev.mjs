import net from 'node:net';
import { spawn } from 'node:child_process';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: root, stdio: 'inherit' });

const requestedPort = Number(process.env.PORT ?? process.argv.find((arg) => /^\d+$/.test(arg)) ?? 8788);

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.listen(port, '127.0.0.1', () => server.close(() => resolve(true)));
  });
}

let port = requestedPort;
while (!(await canListen(port))) {
  port += 1;
  if (port > requestedPort + 20) {
    throw new Error(`8788番台の空きポートが見つかりません（開始: ${requestedPort}）`);
  }
}

if (port !== requestedPort) {
  console.warn(`⚠️ ${requestedPort}番ポートは使用中のため、${port}番ポートで起動します`);
}

const wranglerCli = resolve(root, 'node_modules/wrangler/bin/wrangler.js');
const child = spawn(process.execPath, [
  wranglerCli, 'pages', 'dev', 'dist',
  '--port', String(port),
  '--ip', '0.0.0.0',
  '--compatibility-date', '2026-10-07',
], { cwd: root, stdio: 'inherit', shell: false, windowsHide: false });

console.log(`✅ 開発サーバーを起動しています: http://localhost:${port}`);
console.log(`   LANから接続する場合: http://127.0.0.1:${port}`);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}

child.on('error', (error) => {
  console.error('❌ Wranglerの起動に失敗しました:', error.message);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});
