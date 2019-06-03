const {
  Game,
  validateResultParams,
  validateResult,
  pickDocumentData,
  totalGameFrames
} = require("../modals/game");
const Scoring = require("../processing/scoring");
const express = require("express");
const router = express.Router();

router.patch("/:_id/:player", async (req, res) => {
  const { error: errorParams } = validateResultParams(req.params);
  if (errorParams) return res.status(404).send(errorParams.details[0].message);
  let game = await Game.findOne({ _id: req.params._id });
  if (!game)
    return res.status(404).send("Sorry...There is no record of this game");

  const {
    results: playerResults,
    scores: playerScores,
    ballValues: playerBallValues
  } = pickDocumentData(game, req.params.player, [
    "results",
    "scores",
    "ballValues"
  ]);

  //Validate the player's entered result for this game
  let isLastFrame = false;
  if (playerResults.results.length >= totalGameFrames)
    return res
      .status(400)
      .send("The full results for this game have already been submitted");

  if (playerResults.results.length === totalGameFrames - 1) isLastFrame = true;

  const { error: errorResult } = validateResult(req.body, isLastFrame);
  if (errorResult) return res.status(400).send(errorResult.details[0].message);

  const { _id, player } = req.params;
  const index = player - 1;
  const { result } = req.body;

  const scoring = new Scoring();
  scoring.setFrameResult = result;
  if (!scoring.validatePinValue())
    return res
      .status(400)
      .send("The total result for this frame exceeds the total number of pins");

  //Calcualate frame score and any pending past frames
  scoring.setScores = playerScores.scores;
  scoring.setAccumBallValues = playerBallValues.ballValues;
  scoring.setFrameResult = result;
  scoring.doScoring();

  playerResults.results.push(result);

  // The following is temp code so that the variable reference to the indexed document array (results) can be resolved
  // Target is to push new values to the results array.  Issue is that new result value is pushed twice into this array
  //Start of code to be reviewed

  let updatedResults;
  if (index === 0) {
    updatedResults = await Game.findByIdAndUpdate(
      _id,
      {
        $set: {
          "results.0.results": playerResults.results,
          "scores.0.scores": scoring.getScores,
          "ballValues.0.ballValues": scoring.getAccumBallValues
        }
      },

      { new: true },
      (err, data) => {
        if (err) return res.status(500).send(err);
        return data;
      }
    );
  } else {
    updatedResults = await Game.findByIdAndUpdate(
      _id,
      {
        $set: {
          "results.1.results": playerResults.results,
          "scores.1.scores": scoring.getScores,
          "ballValues.1.ballValues": scoring.getAccumBallValues
        }
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(500).send(err);
        return data;
      }
    );
  }
  //End of code to be reviewed

  res.send(pickDocumentData(updatedResults, player, ["players", "results"]));
});
module.exports = router;
