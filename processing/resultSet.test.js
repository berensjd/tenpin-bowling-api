const ResultSet = require("./resultSet");

let resultSet = new ResultSet();

describe("Valid Ball Throws", () => {
  beforeEach(() => {
    resultSet = new ResultSet();
  });
  afterEach(() => {
    resultSet = null;
  });

  const processResult = (result, totalValue, totalThrows) => {
    resultSet.setFrameResult = result;
    resultSet.parseResultSet();

    expect(resultSet.getBallValues.reduce((acc, val) => acc + val)).toBe(
      totalValue
    );
    expect(resultSet.getBallValues.length).toBe(totalThrows);
  };

  test("Strike - should  have an initial frame value of 10 with one ball throw", () =>
    processResult("x", 10, 1));

  test("Open - should  have a frame value of 17 with three ball throws", () =>
    processResult("34X", 17, 3));
});
