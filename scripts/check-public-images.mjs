#!/usr/bin/env node
import { globby } from 'globby';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');
const exts = ['png','jpg','jpeg','webp','gif','svg'];

const fileGlobs = [
  'app/**/*.{ts,tsx}',
  'components/**/*.{ts,tsx}',
  'lib/**/*.{ts,tsx}'
];

const imagePathRegexes = [
  /<img[^>]*?src\s*=\s*"([^"]+)"/g,
  /<img[^>]*?src\s*=\s*'([^']+)'/g,
  /<Image[^>]*?src\s*=\s*"([^"]+)"/g,
  /<Image[^>]*?src\s*=\s*'([^']+)'/g,
  /['"]\/(?:[^'"\n]+?\.)(?:png|jpg|jpeg|webp|gif|svg)['"]/gi
];

const isForbidden = (p) => /^(https?:|data:|blob:)/i.test(p) || p.startsWith('./') || p.startsWith('../');
const isAllowedPublic = (p) => p.startsWith('/') && exts.some((e)=>p.toLowerCase().endsWith('.'+e));

const errors = [];
const files = await globby(fileGlobs, { gitignore: true });

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const found = new Set();
  for (const rx of imagePathRegexes) {
    let m;
    while ((m = rx.exec(content))) {
      const raw = m[1] ?? (m[0].match(/['"]([^'"]+)['"]/)?.[1]);
      if (!raw) continue;
      if (found.has(raw)) continue; found.add(raw);

      if (isForbidden(raw)) {
        errors.push(`${file}: Forbidden image source "${raw}"`);
        continue;
      }
      if (!isAllowedPublic(raw)) {
        errors.push(`${file}: Image must be from /public ("${raw}")`);
        continue;
      }
      const diskPath = path.join(publicDir, raw);
      if (!fs.existsSync(diskPath)) {
        errors.push(`${file}: Referenced image not found under public ("${raw}")`);
      }
    }
  }
}

if (errors.length) {
  console.error('\nImage source check failed. Only images from /public are allowed.');
  console.error(errors.map((e)=>` - ${e}`).join('\n'));
  process.exit(1);
} else {
  console.log('Image source check passed.');
}

