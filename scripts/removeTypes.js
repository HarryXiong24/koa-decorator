const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../package');

function deleteTypesFolders(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stat) => {
        if (err) {
          return console.error('Unable to stat file: ' + err);
        }

        if (stat.isDirectory() && file.startsWith('@types')) {
          fs.rm(filePath, { recursive: true, force: true }, (err) => {
            if (err) {
              return console.error('Error removing directory: ' + err);
            }
            console.log('Removed directory:', filePath);
          });
        }
      });
    });
  });
}

deleteTypesFolders(directoryPath);
