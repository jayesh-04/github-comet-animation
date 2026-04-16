const fs = require("fs");

function generateSVG(weeks) {
  let svg = `<svg width="1000" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .cell { fill: #161b22; rx: 3; }
    .active { fill: #39d353; }
    .comet { fill: cyan; }
  </style>`;

  let activeCells = [];
  let x = 20;

  weeks.forEach((week) => {
    let y = 20;

    week.contributionDays.forEach((day) => {
      const active = day.contributionCount > 0;

      svg += `
        <rect x="${x}" y="${y}" width="12" height="12"
          class="cell ${active ? "active" : ""}" />
      `;

      if (active) activeCells.push({ x, y });

      y += 18;
    });

    x += 18;
  });

  activeCells.forEach((cell, i) => {
    svg += `
      <circle cx="${cell.x + 6}" r="4" fill="cyan">
        <animate attributeName="cy"
          from="${cell.y - 40}"
          to="${cell.y + 6}"
          dur="0.5s"
          begin="${i * 0.4}s"
          repeatCount="indefinite" />
      </circle>
    `;
  });

  svg += `</svg>`;

  fs.writeFileSync("output/comet-contributions.svg", svg);
}

module.exports = generateSVG;