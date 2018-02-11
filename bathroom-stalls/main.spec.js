const {
  getDistances,
  computeRepetitionsAndMaximums
} = require("./getDistances");

describe("computeRepetitionsAndMaximums", () => {
  test("2", () => {
    expect(computeRepetitionsAndMaximums(2)).toEqual({ "1": 1, "0": 1 });
  });
  test("3", () => {
    expect(computeRepetitionsAndMaximums(3)).toEqual({ "1": 1, "0": 2 });
  });
  test("4", () => {
    expect(computeRepetitionsAndMaximums(4)).toEqual({
      "1": 1,
      "0": 2,
      "2": 1
    });
  });
  test("7", () => {
    expect(computeRepetitionsAndMaximums(7)).toEqual({
      "3": 1,
      "1": 2,
      "0": 4
    });
  });
  test("16", () => {
    expect(computeRepetitionsAndMaximums(16)).toEqual({
      "8": 1,
      "4": 1,
      "3": 1,
      "2": 1,
      "1": 4,
      "0": 8
    });
  });
});

describe("getDistances", () => {
  // no validation required (as in check if N < K etc)

  // start with the sample in the problem's text
  test("n = 4, k = 2", () => {
    expect(getDistances(4, 2)).toEqual({ min: 0, max: 1 });
  });
  test("n = 5, k = 2", () => {
    expect(getDistances(5, 2)).toEqual({ min: 0, max: 1 });
  });
  test("n = 6, k = 2", () => {
    expect(getDistances(6, 2)).toEqual({ min: 1, max: 1 });
  });
  test("n = 1000, k = 1000", () => {
    expect(getDistances(1000, 1000)).toEqual({ min: 0, max: 0 });
  });
  test("n = 1000, k = 1", () => {
    expect(getDistances(1000, 1)).toEqual({ min: 499, max: 500 });
  });

  // a "deeper" test
  test("n = 11, k = ...", () => {
    expect(getDistances(11, 1)).toEqual({ min: 5, max: 5 });
    expect(getDistances(11, 2)).toEqual({ min: 2, max: 2 });
    expect(getDistances(11, 3)).toEqual({ min: 2, max: 2 });
    expect(getDistances(11, 4)).toEqual({ min: 0, max: 1 });
    expect(getDistances(11, 6)).toEqual({ min: 0, max: 1 });
    expect(getDistances(11, 7)).toEqual({ min: 0, max: 1 });
    expect(getDistances(11, 8)).toEqual({ min: 0, max: 0 });
    expect(getDistances(11, 11)).toEqual({ min: 0, max: 0 });
  });

  it("should work with huge numbers", () => {
    const n = Math.pow(10, 18); // this is the upper limit of the large set
    const k = Math.pow(10, 18) - 1;
    expect(getDistances(n, k)).toEqual({ min: 0, max: 0 });
  });
});
