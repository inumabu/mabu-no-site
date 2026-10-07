import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

const run = (args) => {
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run(['scripts/build.mjs']);

const required = [
  'dist/index.html',
  'dist/styles.css',
  'dist/app.js',
  'dist/_headers',
  'dist/manus-routes.json',
];

for (const file of required) await access(resolve(root, file));

const html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const markers = [
  'id="works"', 'id="approach"', 'id="about"',
  'Yanagi', 'Mabubot', 'Mojule', 'Touwa Editor',
  'Java Learning Support', 'Yomiage', 'AsobiBot',
  'Kokoneads', 'Aurora Sauce Language',
];

for (const marker of markers) {
  if (!html.includes(marker)) throw new Error(`Missing marker: ${marker}`);
}

for (const stale of [
  'mabusan',
  'mojuleagent/mojule',
  'aurorasauce/asl',
  'hello@example.com',
  '2024—2026',
  '2026 / TOKYO',
  '/* /index.html 200',
]) {
  if (html.includes(stale)) throw new Error(`Stale content found: ${stale}`);
}

const projectCount = (html.match(/class="project-card/g) ?? []).length;
if (projectCount !== 9) throw new Error(`Expected 9 projects, found ${projectCount}`);

const filterCounts = [
  'ALL <span>09</span>',
  'WEB <span>03</span>',
  'BOT <span>03</span>',
  'DESKTOP <span>01</span>',
  'PLATFORM <span>01</span>',
  'LANGUAGE <span>01</span>',
];
for (const marker of filterCounts) {
  if (!html.includes(marker)) throw new Error(`Missing filter count: ${marker}`);
}

for (const marker of [
  'aria-expanded="false"',
  'aria-pressed="true"',
  'id="current-year"',
]) {
  if (!html.includes(marker)) throw new Error(`Missing accessibility/current marker: ${marker}`);
}

console.log('✅ Portfolio build and content verification passed (9 projects / headers / accessibility / stale-reference checks)');
