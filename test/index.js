var expect = require("chai").expect;
const { searchGoats } = require("../scripts/searchGoats");
const { randomIdGenerator } = require("../utils/randomIdGenerator");

describe("Randomize Checker", function () {
  it("compare two random number and returns false", function () {
    const randomNum1 = randomIdGenerator(new Date("2022-08-13 17:00:00"));
    const randomNum2 = randomIdGenerator(new Date("2022-08-13 18:00:00"));
    const result = randomNum1 === randomNum2;
    expect(result).to.be.false;
  });

  it("It should return search result", async function () {
    const result = await searchGoats(randomIdGenerator());
    expect(result).to.be.an("object");
  });
});
