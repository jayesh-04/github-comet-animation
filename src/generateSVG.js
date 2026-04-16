const fs = require("fs");

function generateSVG(weeks) {
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }

  let svg = `<svg width="1000" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .cell { fill: #161b22; rx: 3; }
    .active { fill: #39d353; }
  </style>`;
  
  // your existing SVG generation logic here...

  svg += `</svg>`;

  fs.writeFileSync("output/comet-contributions.svg", svg);
}

module.exports = generateSVG;