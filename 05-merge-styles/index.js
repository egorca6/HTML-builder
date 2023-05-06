const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'styles');
const project = path.join(__dirname, 'project-dist');
const boundle = path.join(__dirname, 'project-dist', 'bundle.css');
fs.readdir(project,{withFileTypes: true}, (err, files) =>{
  for (const dirent of files){
    const fileExtname = path.extname(dirent.name);
    const fileName = path.basename(dirent.name);
    if (dirent.isFile() && fileExtname === '.css'){
      console.log(fileName);
      fs.unlink(`${boundle}/${fileName}`, () => {
  
      });
    }
  }
}
);

const output = fs.createWriteStream(boundle, 'utf-8');

fs.readdir(folder,{withFileTypes: true}, (err, files) => {
  for (const dirent of files){
    const fileName = path.basename(dirent.name);
    const fileExtname = path.extname(dirent.name);
    if (dirent.isFile() && fileExtname === '.css'){
      console.log(fileName);
      const readableStream = fs.createReadStream(`${folder}/${fileName}`, 'utf-8');
      readableStream.on('data', chunk => {
        output.write(chunk);
      });
    }
  }
} );