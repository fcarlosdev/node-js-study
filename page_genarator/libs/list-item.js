const util = require("./util");

const CARD_COLORS = ["blue-card", "red-card", "green-card", "orange-card"];

const selectColor = () => {
  let backColor = CARD_COLORS[Math.floor(Math.random() * Math.floor(6))];
  return (backColor !== undefined) ? backColor : CARD_COLORS[0];
}


const createCardHead = withTitle => {
    return util.leftSpace(`<div class="card-head">\n`,8)
            .concat(util.leftSpace(`<span class="t-title">${withTitle}</span>\n`,10))
            .concat(util.leftSpace(`<div class="btn-close">x</div>\n`,10))
            .concat(util.leftSpace(`</div>\n`,8));
}

const createContent = withLink => {
    return util.leftSpace(`<div class="link-title">\n`,8)
        .concat(util.leftSpace(`<a href ="${withLink.url}" target="_blank">${withLink.url}</a>\n`, 10))
        .concat(util.leftSpace(`</div>\n`,8));
}


const createListItem = withLink => {

    return util.leftSpace(`<li class="card ${selectColor()}">\n`, 6)
               .concat(createCardHead(withLink.title))
               .concat(createContent(withLink))
               .concat(util.leftSpace(`</li>`, 6));
}


module.exports = {
    createListItem
}

  