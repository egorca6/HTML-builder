const fs = require('fs');
const path = require('path');
const text = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(text, 'utf-8');
readableStream.on('data', chunk => process.stdout.write(chunk));
console.log(text);