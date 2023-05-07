const fs = require('fs');
const path = require('path');
const textTemplate = path.join(__dirname, 'template.html');
const textFooter = path.join(__dirname, 'components', 'footer.html');
const textArticles = path.join(__dirname, 'components', 'articles.html');
const textHeader = path.join(__dirname, 'components', 'header.html');
const folderProject = path.join(__dirname, 'project-dist');
const index = path.join(__dirname, 'project-dist',  'index.html');

const readTemplate = fs.createReadStream(textTemplate, 'utf-8');
const readFooter = fs.createReadStream(textFooter, 'utf-8');
const readArticles = fs.createReadStream(textArticles, 'utf-8');
const readHeader = fs.createReadStream(textHeader, 'utf-8');

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
    const newHtml = template.slice(0, template.indexOf('{{header}}')) + header + '\n' 
    + template.slice(template.indexOf(' <main class='), template.indexOf('{{articles}}')) 
    + articles + '\n' + template.slice(template.indexOf('</main>'),template.indexOf('{{footer}}'))
    + footer + '\n' + template.slice(template.indexOf('</body>'));
    fs.mkdir(folderProject, () => {
      const output = fs.createWriteStream(index, 'utf-8');
      output.write(newHtml);
    });
  });
 
});

