const util = require("../libs/util");

const Body = (withChidren) => ({

  tag: util.leftSpace("<body>\n",2),

  addChildren() {
    if (withChidren !== undefined && withChidren.length > 0) {
      withChidren.forEach(children => {
        this.tag += util.leftSpace("<div>\n",4);
        this.tag += util.leftSpace(`${children}\n`,6);
        this.tag += util.leftSpace("</div>\n",4);
      });
    }
    this.tag += util.leftSpace("</body>",2);
    return this;
  }
})

module.exports = {
  Body
}
