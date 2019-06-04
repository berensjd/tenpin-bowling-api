const request = require("supertest");
const { Game } = require("../modals/game");
let server;
let _id;
const mongoDBIdRegEx = new RegExp("^[0-9a-fA-F]{24}$");

describe("Game Creation", function() {
  beforeAll(async () => {
    server = await require("../index");
  });
  afterAll(async () => {
    await Game.findByIdAndRemove(_id);
    await server.close();
  });

  describe("Enter Player(s)", function() {
    test("Returns Bad Request - no player(s) haven been entered", async function() {
      const response = await request(server).post("/api/new");
      expect(response.status).toBe(400);
      expect(response.text).toBe('"1" is required');
    });

    test("Two players have been entered", async () => {
      const response = await request(server)
        .post("/api/new")
        .send({ "1": "Jonathan", "2": "David" })
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      _id = response.body._id;
      const regexTest = mongoDBIdRegEx.test(_id);
      expect(regexTest).toBeTruthy();
    });
  });
});
