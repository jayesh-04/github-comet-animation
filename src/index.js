const getContributions = require("./fetchContributions");
const generateSVG = require("./generateSVG");

(async () => {
  const weeks = await getContributions(
    process.env.GITHUB_USERNAME,
    process.env.GITHUB_TOKEN
  );

  generateSVG(weeks);
})();