const { stdin } = process;
stdin.setEncoding("utf8");
const readLine = () =>
  new Promise((resolve, reject) => {
    stdin.once("data", resolve);
    stdin.once("error", reject);
  });

/**
 * @deprecated Use readInputFiles() instead
 * @see ./readInputFiles.js
 * Reads input from a file, line by line. The first line is always the number of lines that follow (this format is given in the problems)
 * @param {function} parseLine A callback to use for processing each line except the first
 * @returns {Array}
 */
async function parseInputLineByLine(parseLine = null) {
  try {
    let input = [];
    if (stdin.end) {
      const numberOfCases = await readLine();
      // stdin was not redirected to a file (it's keyboard)
      for (let i = 0; i < numberOfCases; i++) {
        const rawLine = (await readLine()).split("\n")[0];
        input.push(parseLine ? parseLine(rawLine) : rawLine);
      }
      stdin.end();
    } else {
      const fileContent = await readLine();
      const allLines = fileContent.split("\n");
      input = allLines
        .slice(1) // skip the 1st line, it's the number of cases
        .map(parseLine ? parseLine : x => x);
    }
    return input;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { parseInputLineByLine };
