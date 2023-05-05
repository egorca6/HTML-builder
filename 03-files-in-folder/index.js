const fs = require('fs');
const path = require('path');
const list = fs.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true}, (err, files) => {
  for (const dirent of files){
    if (dirent.isFile() === true){
      let size = fs.stat(`./03-files-in-folder/secret-folder/${dirent.name}`, (err, stats) => {
      console.log(path.basename(dirent.name, path.extname(dirent.name)) + ' - ' 
      + path.extname(dirent.name).slice(1) + ' - ' + (stats.size +'b'));
      })
    }
  }
});



