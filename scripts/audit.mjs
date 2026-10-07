import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const skip = new Set(['.git', 'node_modules', 'dist', '.wrangler']);
const required = ['README.md', 'package.json', 'wrangler.toml', 'tsconfig.json', 'public/index.html', 'public/styles.css', 'public/app.js', 'public/manus-routes.json', 'src/tailwind.css', 'functions/[[path]].ts', 'scripts/build.mjs', 'scripts/dev.mjs', 'scripts/verify.mjs'];
for (const file of required) await access(join(root, file));

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = await walk(root);
for (const file of files) {
  const content = await readFile(file, 'utf8');
  if (content.includes('\0')) throw new Error(`NUL byte found: ${file}`);
  if (/[\u0001-\u0008\u000b\u000c\u000e-\u001f]/.test(content)) throw new Error(`Control character found: ${file}`);
}
const html = await readFile(join(root, 'public/index.html'), 'utf8');
for (const marker of ['tailwind.css', 'styles.css', 'app.js', 'github.com/inumabu', 'id="works"', 'id="approach"', 'id="about"']) {
  if (!html.includes(marker)) throw new Error(`HTML marker missing: ${marker}`);
}
const manifest = JSON.parse(await readFile(join(root, 'public/manus-routes.json'), 'utf8'));
if (!Array.isArray(manifest.routes) || manifest.routes.length < 1) throw new Error('Route manifest is empty');
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
for (const script of ['build', 'verify', 'dev']) if (!packageJson.scripts?.[script]) throw new Error(`Missing npm script: ${script}`);
console.log(`✅ 全ファイル監査完了: ${files.length} files`);
