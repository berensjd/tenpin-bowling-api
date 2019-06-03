const Joi = require("joi");
const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
  players: {
    type: Array,
    required: true,
    minlength: 1,
    maxlength: 2
  },
  results: {
    type: Array,
    required: true,
    result: {
      type: Array,
      minlength: 0,
      maxlength: 10
    }
  },

  scores: {
    type: Array,
    required: true,
    minlength: 1,
    maxlength: 2
  },
  ballValues: {
    type: Array
  }
});
const Game = mongoose.model("game", gameSchema);
function validatePlayers(players) {
  const schema = {
    1: Joi.string()
      .min(3)
      .max(50)
      .required(),
    2: Joi.string()
      .min(3)
      .max(50)
  };
  return Joi.validate(players, schema);
}

function validateResultParams(resultParams) {
  const schema = {
    _id: Joi.objectId().required(),
    player: Joi.number()
      .min(1)
      .max(2)
  };
  return Joi.validate(resultParams, schema);
}

function validateResult(result, isLastFrame) {
  let schema;
  if (isLastFrame) {
    schema = {
      result: Joi.string()
        .regex(/^[XxFf0-9-]{1}[XxFf0-9-/]?[XxFf0-9-/]?$/)
        .required()
    };
  } else {
    schema = {
      result: Joi.string()
        .regex(/^[XxFf0-9-]{1}[Ff0-9-/]?$/)
        .required()
    };
  }

  return Joi.validate(result, schema);
}

function buildGameDocSet(enteredPlayers) {
  let playersEntity = [];
  let resultsEntity = [];
  let scoresEntity = [];
  let ballValueEntity = [];
  for (const id in enteredPlayers) {
    playersEntity.push({ id: parseInt(id), name: enteredPlayers[id] });
    resultsEntity.push({ id: parseInt(id), results: [] });
    scoresEntity.push({ id: parseInt(id), scores: [] });
    ballValueEntity.push({ id: parseInt(id), ballValues: [] });
  }
  return {
    players: playersEntity,
    results: resultsEntity,
    scores: scoresEntity,
    ballValues: ballValueEntity
  };
}

function pickDocumentData(data, playerId, selectProps = []) {
  let docSet = {};
  docSet._id = data._id;
  for (const current of selectProps)
    docSet[current] = data[current].find(r => r.id === parseInt(playerId));
  return docSet;
}

exports.Game = Game;
exports.validateEnteredPlayers = validatePlayers;
exports.validateResultParams = validateResultParams;
exports.validateResult = validateResult;
exports.buildGameDocSet = buildGameDocSet;
exports.pickDocumentData = pickDocumentData;
exports.player1_id = "1";
exports.player2_id = "2";
exports.playersPropName = "players";
exports.totalGameFrames = 10;
