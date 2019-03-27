const fs   = require("fs");
const http = require("http");
const path = require("path");
const page = require("./page_build");
const pageParts = require("./page_parts");

const filePath = "page.html";
const PORT     = process.env.PORT || 5000;

const server = http.createServer((req, res) => {

  let pageHtml = page.createPage(
    { title: "Page Generator",},
    {
      content: pageParts.generateContainer([
        pageParts.generateHead(3, 'Generator V1.0'),
        pageParts.generateDiv([
          `This is a Division`,
          pageParts.generateDiv([`<ul><li>Item One</li><li>Item Two</li><li>Item Three</li></ul>`])
        ])
      ])
    }
  );

  let content = pageHtml.html.toString().replace(/>,/g,">\n")
                                        .replace(/,  /g,' ')
                                        .replace(/,</g,'<');

  fs.writeFile(filePath, content, {encoding: "utf8"}, err => {
      if (err) throw err;
    });
  res.end("Hello world");

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
