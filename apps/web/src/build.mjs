import { cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const source = join(__dirname, 'public');
const target = join(__dirname, '..', 'dist');

await cp(source, target, { recursive: true });
console.log('Static assets copied to dist/');
