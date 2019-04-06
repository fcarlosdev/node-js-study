const fs = require("fs");
const http = require("http");
const path = require("path");
const { parse } = require("querystring");

const util = require("./libs/util");
const newItem = require("./libs/list-item");

const CHARSET = "utf8";
const PORT = process.env.PORT || 5000;

const createListMarkup = (page, link) => {
  
  let OPEN_UL = util.leftSpace("<ul>", 4);
  let CLOSE_UL = util.leftSpace("</ul>", 4);

  let elements = page.split("\n");

  if (elements.some(e => e.includes("<ul>"))) {
    let liPos = elements.findIndex(e => e.includes("<ul>"));
    elements.splice(liPos+1, 0, newItem.createListItem(link));
  } else {
    let from =
      elements.findIndex(e => e.includes(`<div class="container">`)) + 1;
    elements.splice(from++, 0, OPEN_UL);
    elements.splice(from++, 0, newLink);
    elements.splice(from++, 0, CLOSE_UL);
  }

  return elements.toString().replace(/>,/g, ">\n").replace(/,/g,"\n");
};

const getPostData = (req, callback) => {
  
  const FORM_URLENCODED = 'application/x-www-form-urlencoded';

  if (req.headers['content-type'] === FORM_URLENCODED) {
    let body = "";  
    req.on("data", chunk => {    
      body += chunk.toString();
    });
    req.on('end', () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }

};

const getFileContent = (file, callback) => {
  let data;
  fs.readFile(file, (err,content) => {
    if (err) throw err;
    callback(content);
  });
}

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "templates",
    req.url === "/" ? "template.html" : req.url
  );

  if (req.method === "POST") {
    getPostData(req, postData => {      
      getFileContent(filePath,result = (content) => {        
        let data = createListMarkup(content.toString(),postData);        
        fs.writeFile("./templates/template.html", data, function(err) {
          if(err) throw err;
        });
        res.end(data, CHARSET);
      });
    })
  } else {
    getFileContent(filePath, (content) => {
      let ext = path.extname(filePath);
      let contentType = "text/html";
      if (ext === ".css") {
        contentType = "text/css";
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, CHARSET);
    });
  }
});

server.listen(PORT, () => console.log(`Server listening at ${PORT}`));
