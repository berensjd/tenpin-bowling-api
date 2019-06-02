const Scoring = require("./scoring");

describe("Average Game  - Allow Scoring to Accumulate Balls Thrown and Scores", () => {
  const scoring = new Scoring();
  scoring.setScores = [];
  scoring.setAccumBallValues = [];
  let frameNo = 0;
  let accumBallValues = [];

  test("1st Frame -Open - Empty Result", () => {
    const frameBallValues = [0, 0];
    scoring.setScores = [];
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = "FF";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: 0,
      runningTotal: 0,
      status: "open",
      totalThrows: 2
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("2nd Frame - Open", () => {
    const frameBallValues = [4, 3];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "43";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: 7,
      runningTotal: 7,
      status: "open",
      totalThrows: 4
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("3rd Frame - Strike", () => {
    const frameBallValues = [10];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "x";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: "pending",
      runningTotal: 7,
      status: "strike",
      totalThrows: 5
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("4th Frame - Spare", () => {
    const frameBallValues = [4, 6];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "4/";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: "pending",
      runningTotal: 27,
      status: "spare",
      totalThrows: 7
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("5th Frame - Strike", () => {
    const frameBallValues = [10];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "X";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: "pending",
      runningTotal: 47,
      status: "strike",
      totalThrows: 8
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("6th Frame - Strike", () => {
    const frameBallValues = [10];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "X";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: "pending",
      runningTotal: 47,
      status: "strike",
      totalThrows: 9
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("7th Frame - Strike", () => {
    const frameBallValues = [10];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "X";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: "pending",
      runningTotal: 77,
      status: "strike",
      totalThrows: 10
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });
  test("8th Frame - Open", () => {
    const frameBallValues = [3, 4];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "34";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: 7,
      runningTotal: 124,
      status: "open",
      totalThrows: 12
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("9th Frame - Spare", () => {
    const frameBallValues = [7, 3];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "7/";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: "pending",
      runningTotal: 124,
      status: "spare",
      totalThrows: 14
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("10th Frame - Strike", () => {
    const frameBallValues = [10, 10, 10];
    accumBallValues = [...accumBallValues, ...frameBallValues];
    frameNo++;
    scoring.setScores = scoring.getScores;
    scoring.setFrameResult = "XXX";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: 30,
      runningTotal: 174,
      status: "tenthFrame",
      totalThrows: 17
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
    console.log(scoring.getScores);
  });
});
