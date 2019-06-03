const Scoring = require("./scoring");

describe("Tragic Game", () => {
  const scoring = new Scoring();
  scoring.setScores = [];
  scoring.setAccumBallValues = [];
  let frameNo = 0;
  let accumBallValues = [];
  const frameBallValues = [0, 0];
  const frameResult = "ff";
  const tragicScore = 0;
  const frameStatus = "open";
  const frameScore = 0;

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
      totalThrows: frameNo * 2
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
      totalThrows: frameNo * 2
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
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo * 2
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
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo * 2
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
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo * 2
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
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo * 2
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
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo * 2
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
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo * 2
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
      runningTotal: 0,
      status: frameStatus,
      totalThrows: frameNo * 2
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("10th Frame -Strike", () => {
    scoring.setScores = scoring.getScores;
    frameNo++;
    accumBallValues = [...accumBallValues, ...frameBallValues];
    scoring.setFrameResult = frameResult;
    scoring.doScoring();
    expect(scoring.getBallValues).toEqual(frameBallValues);
    expect(scoring.getScores[frameNo - 1]).toEqual({
      frameScore: 0,
      runningTotal: tragicScore,
      status: "tenthFrame",
      totalThrows: frameNo * 2
    });
    expect(scoring.getScores.length).toBe(frameNo);
    expect(scoring.getAccumBallValues).toEqual(accumBallValues);
  });

  test("Final Game Scores", () => {
    const finalGameScores = [
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 2
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 4
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 6
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 8
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 10
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 12
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 14
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 16
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "open",
        totalThrows: 18
      },
      {
        frameScore: 0,
        runningTotal: 0,
        status: "tenthFrame",
        totalThrows: 20
      }
    ];

    expect(scoring.getScores).toEqual(finalGameScores);
  });
});
