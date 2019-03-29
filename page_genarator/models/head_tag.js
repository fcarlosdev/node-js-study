const util = require("../libs/util");

const Head = (withTitle, withStyles) => ({

  tag: util.leftSpace("<head>\n",2),

  addTitle() {
    this.tag += util.leftSpace(`<title>${withTitle}</title>\n`,4);
    if (withStyles === undefined ) {
      this.tag += "</head>\n";
    }
    return this;
  },

  addStyles() {
    if (withStyles !== undefined && withStyles.length > 0) {
      withStyles.forEach(style => {
        this.tag += util.leftSpace(`<link rel="stylesheet" href="./${style}">\n`,4);
      });
    }
    this.tag += util.leftSpace("</head>\n",2);
    return this;
  }
})

module.exports = {
    Head
}
