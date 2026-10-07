import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'dist');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(resolve(root, 'public'), out, { recursive: true });
console.log(`Built static site to ${out}`);
