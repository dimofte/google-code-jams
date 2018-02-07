const { getGreatestTidyNumberSmallerThan } = require("./main");

describe("getGreatestTidyNumberSmallerThan", () => {
  it("should return no digit, if none given", () => {
    expect(getGreatestTidyNumberSmallerThan("")).toEqual("");
  });
  it("should return one digit", () => {
    expect(getGreatestTidyNumberSmallerThan("0")).toEqual("0");
    expect(getGreatestTidyNumberSmallerThan("7")).toEqual("7");
  });
  it("should return tidy, if one given", () => {
    expect(getGreatestTidyNumberSmallerThan("1123")).toEqual("1123");
  });
  it("should return the greatest tidy stricty smaller than the input", () => {
    // given as example
    expect(getGreatestTidyNumberSmallerThan("132")).toEqual("129");
    expect(getGreatestTidyNumberSmallerThan("1000")).toEqual("999");
    expect(getGreatestTidyNumberSmallerThan("111111111111111110")).toEqual(
      "99999999999999999"
    );
    // mine
    expect(getGreatestTidyNumberSmallerThan("11002")).toEqual("9999");
  });
});
