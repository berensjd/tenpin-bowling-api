const Scoring = require("./scoring");

describe("Perfect Game", () => {
  const scoring = new Scoring();
  scoring.setScores = [];
  scoring.setAccumBallValues = [];
  let frameNo = 0;
  let accumBallValues = [];
  const frameBallValues = [10];
  const frameResult = "x";
  const perfectScore = 300;
  const frameStatus = "strike";
  const frameScore = "pending";

  test("1st Frame -Strike", () => {
    scoring.setScores = [];
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("2nd Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("3rd Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 30,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("4th Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 60,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("5th Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 90,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("6th Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 120,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("7th Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 150,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("8th Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 180,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("9th Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: frameScore,
      runningTotal: 210,
      status: frameStatus,
      totalThrows: frameNo
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("10th Frame -Strike", () => {
    const frameBallValues = [10, 10, 10];
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = "xxx";
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: 30,
      runningTotal: perfectScore,
      status: "tenthFrame",
      totalThrows: frameNo + 2
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("Final Game Scores", () => {
    const finalGameScores = [
      {
        frameScore: 30,
        runningTotal: 30,
        status: "strike",
        totalThrows: 1
      },
      {
        frameScore: 30,
        runningTotal: 60,
        status: "strike",
        totalThrows: 2
      },
      {
        frameScore: 30,
        runningTotal: 90,
        status: "strike",
        totalThrows: 3
      },
      {
        frameScore: 30,
        runningTotal: 120,
        status: "strike",
        totalThrows: 4
      },
      {
        frameScore: 30,
        runningTotal: 150,
        status: "strike",
        totalThrows: 5
      },
      {
        frameScore: 30,
        runningTotal: 180,
        status: "strike",
        totalThrows: 6
      },
      {
        frameScore: 30,
        runningTotal: 210,
        status: "strike",
        totalThrows: 7
      },
      {
        frameScore: 30,
        runningTotal: 240,
        status: "strike",
        totalThrows: 8
      },
      {
        frameScore: 30,
        runningTotal: 270,
        status: "strike",
        totalThrows: 9
      },
      {
        frameScore: 30,
        runningTotal: 300,
        status: "tenthFrame",
        totalThrows: 12
      }
    ];

    expect(scoring.getScores).toEqual(finalGameScores);
  });
});
