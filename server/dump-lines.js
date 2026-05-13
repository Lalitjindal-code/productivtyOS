const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'controllers', 'memoryController.js');
const text = fs.readFileSync(file, 'utf8');
const lines = text.split(/\r?\n/);
for (let i = 145; i < 170; i += 1) {
  if (i >= lines.length) break;
  console.log(`${(i + 1).toString().padStart(3, '0')}: ${lines[i]}`);
}
