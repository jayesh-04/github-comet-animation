const fs = require("fs");
const path = require("path");

function generateSVG(weeks) {
  const outputDir = path.join(__dirname, "..", "output");
  const outputFile = path.join(outputDir, "comet-contributions.svg");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let svg = `<svg width="1000" height="200" xmlns="http://www.w3.org/2000/svg">
    <style>
      .cell { fill: #161b22; rx: 3; }
      .active { fill: #39d353; }
      .comet { fill: cyan; filter: drop-shadow(0 0 6px cyan); }
    </style>
  `;

  let x = 20;
  let activeCells = [];

  weeks.forEach((week) => {
    let y = 20;

    week.contributionDays.forEach((day) => {
      const active = day.contributionCount > 0;

      svg += `
        <rect x="${x}" y="${y}" width="12" height="12"
          class="cell ${active ? "active" : ""}" />
      `;

      if (active) activeCells.push({ x: x + 6, y: y + 6 });

      y += 18;
    });

    x += 18;
  });

  activeCells.forEach((cell, i) => {
    svg += `
      <circle r="4" class="comet">
        <animate attributeName="cx"
          from="${cell.x - 20}"
          to="${cell.x}"
          dur="0.5s"
          begin="${i * 0.5}s"
          repeatCount="indefinite" />
        <animate attributeName="cy"
          from="${cell.y - 30}"
          to="${cell.y}"
          dur="0.5s"
          begin="${i * 0.5}s"
          repeatCount="indefinite" />
      </circle>
    `;
  });

  svg += `</svg>`;

  fs.writeFileSync(outputFile, svg);
}

module.exports = generateSVG;