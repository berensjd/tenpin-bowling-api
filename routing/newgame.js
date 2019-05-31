const _ = require("lodash");
const {
  Game,
  validateEnteredPlayers: validateEnteredPlayers,
  buildGameDocSet,
  player1_id,
  player2_id,
  playersPropName
} = require("../modals/game");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateEnteredPlayers(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const playersDocSet = buildGameDocSet(
    _.pick(req.body, [player1_id, player2_id])
  );
  game = new Game(playersDocSet);
  await game.save();

  res.send(_.pick(game, ["_id", playersPropName]));
});
module.exports = router;
