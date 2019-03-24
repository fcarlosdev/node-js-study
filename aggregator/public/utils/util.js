const path = require('path');


exports.getContentType = extname => {
  switch(extname) {
      case '.js':
        return 'text/js';
      case '.css':
        return 'text/css';
      case '.json':
        return 'application/json';
      case '.png':
        return 'image/png';
      case '.jpg':
        return 'image/jpg';
      default:
        return 'text/html';
  }
}

exports.extractFileNameFrom = filePath => path.basename(filePath);

exports.getFileExtension = filePath =>  path.extname(filePath);
