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

      svg += `<rect x="${x}" y="${y}" width="12" height="12" class="cell ${active ? "active" : ""}" />`;

      if (active) {
        activeCells.push({ x: x + 6, y: y + 6 });
      }

      y += 18;
    });

    x += 18;
  });

  activeCells.forEach((cell, i) => {
    svg += `
      <circle r="4" class="comet">
        <animateMotion
          dur="0.6s"
          begin="${i * 0.6}s"
          repeatCount="indefinite"
          path="M ${cell.x - 30} ${cell.y - 40} L ${cell.x} ${cell.y}" />
      </circle>
    `;
  });

  svg += `</svg>`;

  fs.writeFileSync(outputFile, svg);
}

module.exports = generateSVG;