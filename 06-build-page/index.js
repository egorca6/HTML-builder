const fs = require('fs');
const path = require('path');
const textTemplate = path.join(__dirname, 'template.html');
const textFooter = path.join(__dirname, 'components', 'footer.html');
const textAbout = path.join(__dirname, 'components', 'about.html');
const textArticles = path.join(__dirname, 'components', 'articles.html');
const textHeader = path.join(__dirname, 'components', 'header.html');
const folderProject = path.join(__dirname, 'project-dist');
const index = path.join(__dirname, 'project-dist',  'index.html');

const readTemplate = fs.createReadStream(textTemplate, 'utf-8');
const readFooter = fs.createReadStream(textFooter, 'utf-8');
const readArticles = fs.createReadStream(textArticles, 'utf-8');
const readHeader = fs.createReadStream(textHeader, 'utf-8');

let about = '';

fs.access(textAbout, (err) => {
  if (err) {
    console.log('Файл about не существует');
  } else {
    console.log('Файл about существует');
    const readAbout = fs.createReadStream(textAbout, 'utf-8');
    about = '';
    readAbout.on('data', chunk => {
      about  += chunk;
    });
  }
});

let template = '';
readTemplate.on('data', chunk => {
  template += chunk;

  let header = '';
  readHeader.on('data', chunk => {
    header  += chunk;
  });

  let articles = '';
  readArticles.on('data', chunk => {
    articles  += chunk;
  });


  let footer = '';
  readFooter.on('data', chunk => {
    footer  += chunk;
  });

  readFooter.on('end', () => {
    fs.mkdir(folderProject, () => {
      const output = fs.createWriteStream(index, 'utf-8');
      template = template.replace('{{header}}', header);
      template = template.replace('{{articles}}', articles);
      template = template.replace('{{footer}}', footer);
      template = template.replace('{{about}}', about);
      output.write(template);
    });
    // css
    const folderCss = path.join(__dirname, 'styles');
    const style = path.join(__dirname, 'project-dist', 'style.css');
    
    fs.readdir(folderProject,{withFileTypes: true}, (err, files) =>{
      for (const dirent of files){
        const fileExtname = path.extname(dirent.name);
        const fileName = path.basename(dirent.name);
        if (dirent.isFile() && fileExtname === '.css'){
          fs.unlink(`${style}/${fileName}`, () => {
  
          });
        }
      }
    }
    );

    const output = fs.createWriteStream(style, 'utf-8');
    fs.readdir(folderCss,{withFileTypes: true}, (err, files) => {
      for (const dirent of files){
        const fileName = path.basename(dirent.name);
        const fileExtname = path.extname(dirent.name);
        if (dirent.isFile() && fileExtname === '.css'){
          const readableStream = fs.createReadStream(`${folderCss}/${fileName}`, 'utf-8');
          readableStream.on('data', chunk => {
            output.write(chunk);
          });
        }
      }
    } );
    // css ends

    // assets
    const assets = path.join(__dirname, 'assets');
    const assetsCopy = path.join(folderProject, 'assets');
    fs.mkdir(assetsCopy, { recursive: true }, () => {
      fs.readdir(assets, {withFileTypes: true}, (err, files) => {
        for (const dirent of files){
          const fileName = path.basename(dirent.name);
          if (dirent.isFile()){
            fs.copyFile(`${assets}/${fileName}`, 
              `${assetsCopy}/${fileName}`, () => {
                console.log(`${assets}/${fileName}`);
              });
          } else {
            const sourceFolder = path.join(assets, dirent.name);
            const destFolder = path.join(assetsCopy, dirent.name);
            fs.mkdir(destFolder, { recursive: true }, () => {
              fs.readdir(sourceFolder, {withFileTypes: true}, (err, files) =>{
                for (const dirent of files){
                  if(dirent.isFile()){
                    const sourceFile = path.join(sourceFolder, dirent.name);
                    const destFile = path.join(destFolder, dirent.name);
                    fs.copyFile(sourceFile, destFile, () => {});
                  }
                }
              });
            });
          }
        }
      });
    } );
    // assets end
  });
 
});



