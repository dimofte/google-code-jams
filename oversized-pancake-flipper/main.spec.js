const { getFlips } = require("./main");

describe("getFlips", () => {
  it("should do some flips", () => {
    expect(getFlips("---+-++-", 3)).toEqual([0, 4, 5]);
  });
  it("should detect impossible cases", () => {
    expect(getFlips("-+-+-", 4)).toEqual(null);
  });
  it("should leave the pancakes alone if they're all good", () => {
    expect(getFlips("++++++", 4)).toEqual([]);
  });
});
