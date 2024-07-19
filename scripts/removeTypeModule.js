import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

delete packageJson.type;

await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Removed "type": "module" from package.json');
