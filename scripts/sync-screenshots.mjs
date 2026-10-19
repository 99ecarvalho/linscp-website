#!/usr/bin/env node
// Copies linscp's screenshots (doc/screenshots/*.png in the linscp repository)
// into src/assets/screenshots/ and lists any without a caption in
// src/data/screenshots.json.
//
//   node scripts/sync-screenshots.mjs [path/to/linscp/doc/screenshots]
//
// Default source: ../doc/screenshots (this repository is linscp's submodule).
import { copyFileSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2] ?? join(root, '..', 'doc', 'screenshots');
const dst = join(root, 'src/assets/screenshots');
if (!existsSync(src)) throw new Error(`no screenshots at ${src}`);

const captions = JSON.parse(readFileSync(join(root, 'src/data/screenshots.json'), 'utf8'));
const files = readdirSync(src).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
for (const f of files) copyFileSync(join(src, f), join(dst, f));
console.log(`copied ${files.length} screenshots`);
const missing = files.filter((f) => !captions[f]);
if (missing.length) console.log(`no caption yet in src/data/screenshots.json:\n  ${missing.join('\n  ')}`);
