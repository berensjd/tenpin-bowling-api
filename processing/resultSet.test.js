const ResultSet = require("./resultSet");

let resultSet = new ResultSet();

describe("Frames 1-9 -Valid Ball Throws", () => {
  beforeEach(() => {
    resultSet = new ResultSet();
  });
  afterEach(() => {
    resultSet = null;
  });

  const isTenthFrame = false;

  const processResult = (result, totalValue, totalThrows) => {
    resultSet.setFrameResult = result;
    resultSet.parseResultSet();

    expect(resultSet.getBallValues.reduce((acc, val) => acc + val)).toBe(
      totalValue
    );
    expect(resultSet.getBallValues.length).toBe(totalThrows);
  };

  const validateResultSet = (result, isTenthFrame = false) => {
    const isValid = resultSet.validateResult(result, isTenthFrame);

    expect(isValid).toBeTruthy();
  };

  test("Strike - should  have an initial frame value of 10 with one ball throw", () => {
    const result = "x";
    validateResultSet(result, isTenthFrame);
    processResult(result, 10, 1);
  });

  test("Open - should  have a frame value of 7 with three ball throws", () => {
    const result = "34";
    validateResultSet(result, isTenthFrame);
    processResult(result, 7, 2);
  });

  test("Spare - should  have an initial frame value of 10 with two ball throws", () => {
    const result = "3/";
    validateResultSet(result, isTenthFrame);
    processResult(result, 10, 2);
  });

  test("Gutter balls - should  have a NIL frame value with two ball throws", () => {
    const result = "--";
    validateResultSet(result, isTenthFrame);
    processResult(result, 0, 2);
  });
});

describe("Tenth Frame -Valid Ball Throws", () => {
  beforeEach(() => {
    resultSet = new ResultSet();
  });
  afterEach(() => {
    resultSet = null;
  });

  const isTenthFrame = true;

  const processResult = (result, totalValue, totalThrows) => {
    resultSet.setFrameResult = result;
    resultSet.parseResultSet();

    expect(resultSet.getBallValues.reduce((acc, val) => acc + val)).toBe(
      totalValue
    );
    expect(resultSet.getBallValues.length).toBe(totalThrows);
  };

  const validateResultSet = (result, isTenthFrame = false) => {
    const isValid = resultSet.validateResult(result, isTenthFrame);

    expect(isValid).toBeTruthy();
  };

  test("Should  have resultset  value of 20 with three ball throws -x4/", () => {
    const result = "x4/";
    validateResultSet(result, isTenthFrame);
    processResult(result, 20, 3);
  });

  test("Open - should  have a frame value of 7 with three ball throws - 34", () => {
    const result = "34";
    validateResultSet(result, isTenthFrame);
    processResult(result, 7, 2);
  });

  test("Should have a result set value of 15 -3/5", () => {
    const result = "3/5";
    validateResultSet(result, isTenthFrame);
    processResult(result, 15, 3);
  });

  test("Gutter balls - should  have a NIL frame value with two ball throws", () => {
    const result = "--";
    validateResultSet(result, isTenthFrame);
    processResult(result, 0, 2);
  });
});

describe("Tenth Frame -Invalid result ball throws", () => {
  beforeEach(() => {
    resultSet = new ResultSet();
  });
  afterEach(() => {
    resultSet = null;
  });

  const validateResultSet = (result, isTenthFrame = false) => {
    const isValid = resultSet.validateResult(result, isTenthFrame);

    expect(isValid).toBeFalsy();
  };

  const isTenthFrame = true;

  test("Incomplete ball throws - XX", () => {
    validateResultSet("xx", isTenthFrame);
  });

  test("Invalid reseult set - x/x", () => {
    validateResultSet("x/x", isTenthFrame);
  });

  test("Invalid result set - ///", () => {
    validateResultSet("///", isTenthFrame);
  });
  test("Invalid result set - /XX", () => {
    validateResultSet("/XX", isTenthFrame);
  });
  test("No resultset has been entered", () => {
    validateResultSet("", isTenthFrame);
  });

  test("Incorrect number of throws - 34X", () => {
    validateResultSet("34X", isTenthFrame);
  });
  test("Incorrect number of throws - FFF", () => {
    validateResultSet("FFF", isTenthFrame);
  });
});

describe("1-9 Frame -Invalid result ball throws", () => {
  beforeEach(() => {
    resultSet = new ResultSet();
  });
  afterEach(() => {
    resultSet = null;
  });

  const validateResultSet = (result, isTenthFrame = false) => {
    const isValid = resultSet.validateResult(result, isTenthFrame);

    expect(isValid).toBeFalsy();
  };

  const isTenthFrame = false;

  test("Incomplete ball throws - 4", () => {
    validateResultSet("4", isTenthFrame);
  });

  test("Invalid reseult set - /x", () => {
    validateResultSet("/x", isTenthFrame);
  });

  test("Invalid result set - ///", () => {
    validateResultSet("//", isTenthFrame);
  });
  test("Invalid result set - XX", () => {
    validateResultSet("XX", isTenthFrame);
  });
  test("No resultset has been entered", () => {
    validateResultSet("", isTenthFrame);
  });

  test("Incorrect number of throws - XXX", () => {
    validateResultSet("XXX", isTenthFrame);
  });
  test("Incorrect number of throws - X9", () => {
    validateResultSet("X9", isTenthFrame);
  });
});
