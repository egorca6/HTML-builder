const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;
const text = path.join(__dirname, 'destination.txt');
const output = fs.createWriteStream(text, 'utf-8');
stdout.write('ВВедите любой текст \n');
stdin.on('data', chunk => {
  if (chunk.toString().trim() === 'exit') {
    stdout.write('Удачи в изучении Node.js');
    process.exit();
  } else output.write(chunk)
});
process.on('SIGINT', () => {
  stdout.write('ТЫ лучший в Node.js')
  process.exit();
});