const fs = require('fs');
const path = require('path');
const folderCopy = path.join(__dirname, 'files-copy')
const folder = path.join(__dirname, 'files')
 fs.mkdir(folderCopy, { recursive: true }, () => {
 fs.readdir(folderCopy,{withFileTypes: true}, (err, files) => {
  for (dirent of files){
    if (dirent.isFile()){
const fileName = path.basename(dirent.name);

fs.unlink(`${folderCopy}/${fileName}`, () => {
  // console.log(`Delete ${fileName} from ${folderCopy}` );
})
    }
  }
 } )
 fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  for (const dirent of files){
    if (dirent.isFile()){
      const fileName = path.basename(dirent.name);
      fs.copyFile(`${folder}/${fileName}`, 
      `${folderCopy}/${fileName}`, () => {
});
    }
  }
});
} );
