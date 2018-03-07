// @flow
const { parseInputLineByLine } = require('../common/parseStdin')
const { readInputFiles, outputToFile } = require('../common/io')

function getFlips(initialPancakes: string, flipperSize: number): number[] | null {
  const pancakes: string[] = initialPancakes.split('')
  const flips = []
  for (let i = 0; i <= pancakes.length - flipperSize; i++) {
    if (pancakes[i] === '-') {
      for (let j = i; j < i + flipperSize; j++) {
        pancakes[j] = pancakes[j] === '-' ? '+' : '-'
      }
      flips.push(i)
    }
  }
  for (let i = pancakes.length - flipperSize + 1; i < pancakes.length; i++) {
    if (pancakes[i] === '-') {
      return null
    }
  }
  return flips
}

function lineParser(line: string): { pancakes: string, flipperSize: number } {
  const [pancakes, flipperSize]: string[] = line.split(' ')
  return { pancakes, flipperSize: parseFloat(flipperSize) }
}

function main() {
  const sets = readInputFiles(`${__dirname}/in`, lineParser)
  sets.forEach(({ lines, nameOfSet }) => {
    const results = lines.map(({ pancakes, flipperSize }, idx) => {
      const flips = getFlips(pancakes, flipperSize)
      return `Case #${idx + 1}: ${flips === null ? 'IMPOSSIBLE' : flips.length}`
    })
    outputToFile(`${__dirname}/out/${nameOfSet}.out`, results)
  })
}

module.exports = { getFlips } // for unit tests

main()
