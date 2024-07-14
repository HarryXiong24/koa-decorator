import { statSync, readdirSync } from 'fs';
import * as path from 'path';

function getAllFiles(dir: string, files: string[] = []) {
  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullpath = path.join(dir, entry);
      let stats;
      try {
        stats = statSync(fullpath);
      } catch (error) {
        console.error(`Error getting stats for file: ${fullpath}`, error);
        continue;
      }

      if (stats.isDirectory()) {
        getAllFiles(fullpath, files);
      } else if (
        stats.isFile() &&
        /\.(ts|js)$/.test(entry) &&
        !entry.endsWith('.d.ts')
      ) {
        files.push(fullpath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory: ${dir}`, error);
  }

  return files;
}

export function loadControllers(dir: string) {
  const filepaths = getAllFiles(dir);
  for (const filepath of filepaths) {
    try {
      require(filepath);
    } catch (error) {
      console.error(`Error loading controller file: ${filepath}`, error);
    }
  }
}
