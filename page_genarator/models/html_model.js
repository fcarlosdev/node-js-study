const util = require("../libs/util");
const headTag = require("./head_tag");
const bodyTag = require("./body_tag");

const HtmlDocument = () => ({

  doc: "<!DOCTYPE html>",

  openRootElement() {
    this.doc += "\n<html>\n";
    return this;
  },

  closeRootElement() {
    this.doc += "\n</html>";
    return this;
  },

  addHeadTag(withTitle, withStyles) {
    this.doc += headTag.Head(withTitle,withStyles)
                       .addTitle()
                       .addStyles()
                       .tag;
    return this;
  },

  addBodyTag(withChildren) {
    // this.doc += util.leftSpace(`<body>\n`,2);
    // if (withChildren === undefined || withChildren.length == 0) {
    //   this.doc += util.leftSpace(`</body>`,2);
    // }
    this.doc += bodyTag.Body(withChildren).addChildren().tag;
    return this;
  }

});

let html = HtmlDocument();

module.exports = {
  html
}
