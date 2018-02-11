// @flow
/**
 * @see https://code.google.com/codejam/contest/3264486/dashboard#s=p2&a=4
 */
const { parseInputLineByLine } = require("../common/parseStdin");
const { readInputFiles, outputToFile } = require("../common/io");
const {
  getDistances,
  computeRepetitionsAndMaximums
} = require("./getDistances");

function lineParser(line: string): { n: number, k: number } {
  const [n, k]: string[] = line.split(" ");
  return { n: parseFloat(n), k: parseFloat(k) };
}

function main() {
  const sets = readInputFiles(`${__dirname}/in`, lineParser);
  sets.forEach(({ lines, nameOfSet }) => {
    const results = lines.map(({ n, k }, idx) => {
      const { min, max } = getDistances(n, k);
      return `Case #${idx + 1}: ${max} ${min}`;
    });
    outputToFile(`${__dirname}/out/${nameOfSet}.out`, results);
  });
}

main();
