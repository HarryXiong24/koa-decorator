const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = require(packageJsonPath);

packageJson.type = 'module';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('"type": "module" added to package.json');
