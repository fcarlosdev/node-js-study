const fs = require("fs");
const http = require("http");
const path = require("path");

const htmlBuilder = require("./models/html_model");

const PORT = process.env.PORT || 5000;

console.log(
  htmlBuilder.html
    .openRootElement()
    .addHeadTag("Learning Node JS",["main.css","card.css"])
    .addBodyTag([])
    .closeRootElement()
    .doc)

const server = http.createServer((req, res) => {
  res.end();
});

server.listen(PORT, () => console.log(`Server listening at ${PORT}`));
