const fs = require("fs");
const http = require("http");
const path = require("path");
const { parse } = require('querystring');

const util = require("./libs/util");

const CHARSET = "utf8";
const PORT = process.env.PORT || 5000;

const createListMarkup = (page, link) => {

  let OPEN_UL = util.leftSpace("<ul>",4);
  let CLOSE_UL = util.leftSpace("</ul>",4)

  let elements = page.split("\n");

  let newLink  = util.leftSpace(`<li>\n`,6);
      newLink += util.leftSpace(`<a href ="${link.url}">${link.title}</a>\n`,8);
      newLink += util.leftSpace(`</li>`,6);

  if (elements.some(e => e.includes("<ul>"))) {
    let liPos = elements.findIndex( e => e.includes("</ul>"));
    elements.splice(liPos,0,newLink);
  } else {
      let from = (elements.findIndex(e => e.includes(`<div class="container">`))) + 1;
      elements.splice(from++,0,OPEN_UL);
      elements.splice(from++,0,newLink);
      elements.splice(from++,0,CLOSE_UL);
  }

  return elements.toString().replace(/>,/g,">\n");
}


const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      let link_data = parse(body);
      fs.readFile("./templates/template.html", (err,content) => {
        if (err) throw err;
        let data = createListMarkup(content.toString(),link_data);
        fs.writeFile("./templates/template.html", data, function(err) {
          if(err) console.log(err);
        });
        res.end(data, CHARSET);
      })
    });
  } else {
    fs.readFile("./templates/template.html", (err,data) => {
      if (err) throw err;
      // data = changePageContent(data.toString());
      // let htmlPage = data.toString().split("\n");
      res.end(data, CHARSET);
    })
  }
});

server.listen(PORT, () => console.log(`Server listening at ${PORT}`));
