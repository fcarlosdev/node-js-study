const PageBuild = () => ({
  html: ["<!DOCTYPE html>"],

  addHtmlTags(headContents, bodyContents) {
    this.html.push("<html>\n");
    this.addHead(headContents);
    this.addBody(bodyContents);
    this.html.push("</html>");
    return this;
  },

  addHead(othersContent) {
    this.html.push("   <head>\n");
    this.html.push("    <meta charset='UTF-8'>");
    this.html.push("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    this.html.push("    <meta http-equiv='X-UA-Compatible' content='ie=edge'>");
    if (othersContent !== undefined && othersContent.title !== ''){
      this.html.push(`    <title>${othersContent.title}</title>`);
    } else {
      this.html.push("    <title>Document</title>");
    }
    this.html.push("  </head>\n");
    return this;
  },

  addBody(bodyContent) {
    this.html.push("   <body>\n");
    if (bodyContent !== undefined) {
      this.html.push(bodyContent.content);
    }
    this.html.push("  </body>\n");
    return this;
  }
});

let createPage = (headContents, bodyContents) => {
  return PageBuild().addHtmlTags(headContents, bodyContents);
}

module.exports = {
  createPage
}
