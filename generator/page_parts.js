
const generateContainer = content => {

  let contents =`<div class="container">`;
  content.forEach(c => { contents += `\n${c}\n` })
  contents += `</div>`;

  return contents;
};

const generateHead = (number, withText) => `<h${number}> ${withText} </h${number}>\n`;

const generateDiv = withChildren => {

  let divContent = `<div>`;

  withChildren.forEach(children => {
    if (typeof children !== "string") {
      divContent += `\n${children}\n`
    } else {
      divContent += `${children}`
    }
  })

  divContent += `\n</div>`;

  // return `<div>\n  ${withChildren}  \n</div>`
  return divContent;

}

module.exports = {
  generateContainer,
  generateHead,
  generateDiv
}
