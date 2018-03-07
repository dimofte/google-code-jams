// @flow

/** Calculates that max(LS, RS) and min(LS, RS) as calculated by the last
 *  person (k) to enter the bathroom for their chosen stall
 */
function getDistances(n: number, k: number): { min: number, max: number } {
  const maxAndReps = computeRepetitionsAndMaximums(n)
  const maxAndRepsOrderedEntries = Object.keys(maxAndReps)
    .sort()
    .reverse()
    .map(max => ({ max: parseFloat(max), rep: parseFloat(maxAndReps[max]) }))

  let i = 0

  for (
    let sum = 0;
    k > sum && i < maxAndRepsOrderedEntries.length;
    sum += maxAndRepsOrderedEntries[i].rep, i++
  );
  const max = i === 1 ? n : maxAndRepsOrderedEntries[i - 2].max

  return {
    min: max === 0 ? 0 : Math.floor((max - 1) / 2),
    max: max === 0 ? 0 : Math.ceil((max - 1) / 2),
  }
}

// calculate the union between 2 sets (here, arrays with unique elements)
function union(a: Array<any>, b: Array<any>): Array<any> {
  const diff = a.filter(el => b.indexOf(el) < 0)
  return [...b, ...diff]
}

const cachedRepsMaxes = {} // save ourselves a lot of recalculations!
/**
 * Calculate how many times each maximum distance (max(LS, RS)) will occur
 * Using divide et impera, O(log n)
 * @return {Object} Where key = max, value = number of repetitions for this max
 */
function computeRepetitionsAndMaximums(n: number): Object {
  if (n === 0) return {}
  if (n === 1) {
    return { '0': 1 }
  }
  const half = Math.floor(n / 2)
  const bigHalfSetResults = cachedRepsMaxes[half] || computeRepetitionsAndMaximums(half)
  if (n % 2 === 1) {
    const maxAndReps = Object.keys(bigHalfSetResults).reduce(
      (accu, crt) => ({
        ...accu,
        [crt]: bigHalfSetResults[crt] * 2,
      }),
      {}
    )
    cachedRepsMaxes[n] = { [half]: 1, ...maxAndReps }
    return cachedRepsMaxes[n]
  }
  const smallHalfSetResults = cachedRepsMaxes[half - 1] || computeRepetitionsAndMaximums(half - 1)
  const maxes = union(Object.keys(bigHalfSetResults), Object.keys(smallHalfSetResults))
  const maxAndReps = maxes.reduce(
    (accu, crt) => ({
      ...accu,
      [crt]: (bigHalfSetResults[crt] || 0) + (smallHalfSetResults[crt] || 0),
    }),
    {}
  )
  return { [half]: 1, ...maxAndReps }
}

module.exports = { getDistances, computeRepetitionsAndMaximums }
