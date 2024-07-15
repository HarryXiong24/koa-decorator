import { statSync, readdirSync } from 'fs';
import * as path from 'path';

function getAllFiles(dir: string, files: string[] = []) {
  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      let stats;
      try {
        stats = statSync(fullPath);
      } catch (error) {
        console.error(`Error getting stats for file: ${fullPath}`, error);
        continue;
      }

      if (stats.isDirectory()) {
        getAllFiles(fullPath, files);
      } else if (
        stats.isFile() &&
        /\.(ts|js)$/.test(entry) &&
        !entry.endsWith('.d.ts')
      ) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory: ${dir}`, error);
  }

  return files;
}

/**
 * Load all Import in the given directory
 * @param dir
 */
export function loadImport(dir: string) {
  const filePaths = getAllFiles(dir);
  for (const filePath of filePaths) {
    try {
      require(filePath);
    } catch (error) {
      console.error(`Error loading controller file: ${filePath}`, error);
    }
  }
}
