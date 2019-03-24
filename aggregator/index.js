//Core modules
const fs = require('fs');
const http = require('http');
const path = require('path');

//App modules
const store = require('./public/store/links_db');
const util  = require('./public/utils/util');

const server = http.createServer((req, res) => {

  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );

  let extname = util.getFileExtension(filePath);

  let contentType = util.getContentType(extname);

  if (contentType === 'text/html' && extname == '')
   filePath += '.html';

   debugger;

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        //Page not found
        fs.readFile(
          path.join(__dirname, 'public','404.html'),
          (err,content) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf8')
          })
      } else {
        // Some server error;
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf8');
    }
  })

})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
