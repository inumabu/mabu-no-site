import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'dist');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(resolve(root, 'public'), out, { recursive: true });
const tailwindCli = resolve(root, 'node_modules/@tailwindcss/cli/dist/index.mjs');
await run(process.execPath, [tailwindCli, '-i', 'src/tailwind.css', '-o', 'dist/tailwind.css', '--minify'], { cwd: root });
console.log(`Built Tailwind + static site to ${out}`);
