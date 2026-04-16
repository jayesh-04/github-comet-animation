const fs = require("fs");

function generateSVG(weeks) {
  // Ensure output directory exists
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output", { recursive: true });
  }

  let svg = `<svg width="1000" height="200" xmlns="http://www.w3.org/2000/svg">
    <style>
      .cell { fill: #161b22; rx: 3; }
      .active { fill: #39d353; }
    </style>
  `;

  let x = 20;

  weeks.forEach((week) => {
    let y = 20;

    week.contributionDays.forEach((day) => {
      const active = day.contributionCount > 0;

      svg += `
        <rect x="${x}" y="${y}" width="12" height="12"
          class="cell ${active ? "active" : ""}" />
      `;

      y += 18;
    });

    x += 18;
  });

  svg += `</svg>`;

  fs.writeFileSync("output/comet-contributions.svg", svg);
}

module.exports = generateSVG;