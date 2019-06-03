const request = require("supertest");

const { Game, buildGameDocSet } = require("../modals/game");
let gameId;
let frameNo = 0;

describe("Game Simulation", function() {
  beforeAll(async () => {
    server = require("../index");
    const playersDocSet = buildGameDocSet({ "1": "Jonathan", "2": "David" });
    const game = new Game(playersDocSet);
    await game.save();
    gameId = game._id;
  });
  afterAll(async () => {
    await Game.findByIdAndRemove(gameId);
    await server.close();
  });

  describe("Process Game", function() {
    const sendResult = async (id, result) => {
      return await request(server)
        .patch(`/api/result/${gameId}/${id}`)
        .send({ result })
        .set("Accept", "application/json");
    };

    const fetchScore = async id => {
      return await request(server)
        .get(`/api/score/${gameId}/${id}`)
        .set("Accept", "application/json");
    };

    const expectedResult = function(id, results) {
      return {
        id,
        results: results
      };
    };

    test("Check we have a game ID", function() {
      expect(gameId).toBeTruthy();
    });

    test("1st Frame ", async () => {
      frameNo++;
      const response = await sendResult("1", "3/");
      expect(response.body.results).toEqual(expectedResult(1, ["3/"]));
    });
    test("2nd Frame ", async () => {
      frameNo++;
      const response = await sendResult("1", "x");
      expect(response.body.results).toEqual(expectedResult(1, ["3/", "x"]));
    });
    test("3rd Frame ", async () => {
      frameNo++;
      const response = await sendResult("1", "45");
      expect(response.body.results).toEqual(
        expectedResult(1, ["3/", "x", "45"])
      );
    });

    test("Check Scores", async () => {
      const response = await fetchScore("1");
      expect(response.body[frameNo - 1].runningTotal).toBe(48);
    });

    test("4th Frame ", async () => {
      frameNo++;
      const response = await sendResult("1", "x");
      expect(response.body.results).toEqual(
        expectedResult(1, ["3/", "x", "45", "x"])
      );
    });

    test("5th Frame ", async () => {
      frameNo++;
      const response = await sendResult("1", "ff");
      expect(response.body.results).toEqual(
        expectedResult(1, ["3/", "x", "45", "x", "ff"])
      );
    });

    test("Check Scores - 2nd time", async () => {
      const player_1 = 1;
      const response = await fetchScore(player_1);
      expect(response.body[frameNo - 1].runningTotal).toBe(58);
    });

    test("6th Frame ", async () => {
      frameNo++;
      const player_1 = 1;
      const response = await sendResult(player_1, "7/");
      expect(response.body.results).toEqual(
        expectedResult(player_1, ["3/", "x", "45", "x", "ff", "7/"])
      );
    });
    test("7th Frame ", async () => {
      frameNo++;
      const player_1 = 1;
      const response = await sendResult(player_1, "x");
      expect(response.body.results).toEqual(
        expectedResult(player_1, ["3/", "x", "45", "x", "ff", "7/", "x"])
      );
    });

    test("8th Frame ", async () => {
      frameNo++;
      const player_1 = 1;
      const response = await sendResult(player_1, "34");
      expect(response.body.results).toEqual(
        expectedResult(player_1, ["3/", "x", "45", "x", "ff", "7/", "x", "34"])
      );
    });
    test("9th Frame ", async () => {
      frameNo++;
      const player_1 = 1;
      const response = await sendResult(player_1, "6/");
      expect(response.body.results).toEqual(
        expectedResult(player_1, [
          "3/",
          "x",
          "45",
          "x",
          "ff",
          "7/",
          "x",
          "34",
          "6/"
        ])
      );
    });
    test("10th Frame ", async () => {
      frameNo++;
      const player_1 = 1;
      const response = await sendResult(player_1, "2/x");
      expect(response.body.results).toEqual(
        expectedResult(player_1, [
          "3/",
          "x",
          "45",
          "x",
          "ff",
          "7/",
          "x",
          "34",
          "6/",
          "2/x"
        ])
      );
    });

    test("Check Scores - 3rd time", async () => {
      const player_1 = 1;
      const response = await fetchScore(player_1);
      expect(response.body[frameNo - 1].runningTotal).toBe(134);
    });
  });
});
