const fs   = require("fs");
const path = require("path");
const http = require("http");
const queryString = require("querystring");

const util = require("./util");

const PORT = process.env.PORT || 5000;

let contentType = "";

const CARD_COLORS = ["blue-card", "red-card", "green-card", "orange-card"];

http.createServer( (req, res) => {

    let filePath = path.join(
        __dirname,
        "/",
        (req.url === "/" || req.url.includes("/delete")) ? "index.html" : req.url
    );

    if (req.method === "POST") {
        getPostData(req, postData => {
            getFileContent(filePath, content => {
                let lines = content.toString().split("\n");
                let newPage = formatPage(createPageElement(lines, postData)); 
                fs.writeFile(filePath, newPage, err => {
                    if (err) throw err;
                });
                res.end(newPage);
            })
        })
    } else if (req.url.includes("/delete")) {            
        getFileContent(filePath, content => {
            let lines = content.toString().split("\n");
            let pos = findPosOf(`id="${req.url.match(/\d+/g)}"`,lines);
            lines.splice(pos, 6);
            let newPage = formatPage(lines); 
            fs.writeFile(filePath, newPage, err => {
                if (err) throw err;
            });
            res.writeHead(302, {'Location': '/' });            
            res.end(newPage);
        });        
    } else {        
        getFileContent(filePath, content => {
            contentType = getFileType(path.extname(filePath));
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
          });
    }
}).listen(PORT, () => console.log(`Server listening in ${PORT}`))


const getFileContent = (file, callback) => {  
    fs.readFile(file, (err,content) => {
      if (err) throw err;
      callback(content);
    });
}

const getFileType = extname => {
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

const getPostData = (req, callback) => {
  
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
  
    if (req.headers['content-type'] === FORM_URLENCODED) {
      let body = "";  
      req.on("data", chunk => {    
        body += chunk.toString();
      });
      req.on('end', () => {
        callback(queryString.parse(body));
      });
    } else {
      callback(null);
    }
  
  };

const findPosOf = (value, fileLines) => fileLines.findIndex(line => line.includes(value));

const createPageElement = (lines, data) => {
    let id = generateId(lines);
    let pos = findPosOf(`<div class="links">`, lines);
    let newLine  = util.leftSpace(`<div id="${id}" class="item ${selectColor()}">\n`,6);
        newLine += util.leftSpace(`<a href="${data.url}">${data.title}</a>\n`,8);
        newLine += util.leftSpace(`<div class="btn-close">\n`,8);
        newLine += util.leftSpace(`<a href="/delete/${id}" class="bt">x</a>\n`,10);
        newLine += util.leftSpace(`</div>\n`,8);
        newLine += util.leftSpace(`</div>`,6);
    lines.splice(pos+1, 0, newLine);
    return lines;
}

const formatPage = pageLines => pageLines.toString().replace(/>,/g,">\n")
                                         .replace(/>                ,/g,">\n");

const generateId = lines => lines.filter(line => line.includes("id=")).length + 1;

const selectColor = () => {
    let backColor = CARD_COLORS[Math.floor(Math.random() * Math.floor(6))];
    return (backColor !== undefined) ? backColor : CARD_COLORS[0];
}