const { Game } = require("../modals/game");
const express = require("express");
const router = express.Router();

router.get("/:_id", async (req, res) => {
  let game = await Game.findOne({ _id: req.params._id });
  if (!game)
    return res.status(404).send("Sorry...There is no record of this game");
  res.send(game);
});
module.exports = router;
