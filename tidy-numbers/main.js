// @flow
const { parseInputLineByLine } = require('../common/parseStdin')

function getGreatestTidyNumberSmallerThan(n: string): string {
  let hasChanged: boolean
  let digits: number[] = n.split('').map(parseFloat)
  if (!digits.length) return ''
  do {
    hasChanged = false
    digits = digits.map((crt, idx, arr) => {
      // can be improved: the ending '9's won't change
      // if a change has been made, all the subsequent digits become 9
      if (hasChanged) {
        return 9
      }
      // detect if we need to change a digit
      const next = arr[idx + 1]
      if (next < crt) {
        hasChanged = true
        return crt - 1
      }
      // all good, no change needed
      return crt
    })
  } while (hasChanged)
  const woLeadingZeroes = digits.join('').replace(/^0+/g, '')
  return woLeadingZeroes || '0'
}

async function main(): Promise<void> {
  const input: string[] = await parseInputLineByLine()
  input.map(getGreatestTidyNumberSmallerThan).forEach((tidy, idx) => {
    if (tidy.length) {
      console.log(`Case #${idx + 1}: ${tidy}`)
    }
  })
}

module.exports = { getGreatestTidyNumberSmallerThan } // for testing

main()
