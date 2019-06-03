const { Game, pickDocumentData } = require("../modals/game");
const express = require("express");
const router = express.Router();

router.get("/:_id/:player", async (req, res) => {
  let game = await Game.findOne({ _id: req.params._id });
  if (!game)
    return res.status(404).send("Sorry...There is no record of this game");

  const { scores: playerScores } = pickDocumentData(game, req.params.player, [
    "scores"
  ]);

  res.send(playerScores.scores);
});
module.exports = router;
