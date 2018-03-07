// @flow
const { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs')

function readInputFiles(
  dir: string,
  lineParser?: string => any,
  hasCountAtFirstLine: boolean = true
): Array<{
  lines: any[],
  nameOfSet: string,
}> {
  return readdirSync(dir).map(fileName => {
    const allLines = readFileSync(`${dir}/${fileName}`, { encoding: 'utf8' })
      .split(`\n`)
      .filter(line => line) // skip empty lines (usually a new line at the end of file)
    const lines = hasCountAtFirstLine ? allLines.slice(1) : allLines
    return {
      lines: !lineParser ? lines : lines.map(lineParser), // apply given parser
      nameOfSet: fileName.replace(/\.[^\.]+$/, ''),
    }
  })
}

function outputToFile(fileName: string, results: string[]): void {
  const dir = fileName.replace(/\/[^\/]+$/, '')
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }
  const output = results.reduce((accu, crt) => accu + crt + '\n', '')
  writeFileSync(fileName, output)
}

module.exports = { readInputFiles, outputToFile }
