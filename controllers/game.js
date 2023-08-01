const Game = require("../models/Game");
// const GameMoves = require("../models/GameMoves");

exports.playGame = (req, res) => {
  res.send({ response: "I am alive" }).status(200);
};

exports.saveResult = async (req, res) => {
  try {
    const game = req.body;
    const gameList = new Game(game);
    const saveGameList = await gameList.save();

    res.json(saveGameList);
  } catch (error) {
    res.status(500).send("Can't save the game");
  }
};

exports.getGameList = async (req, res) => {
  try {
    const username = req.params.username;
    const games = await Game.find({
      $or: [{ first: username }, { second: username }],
    });
    res.json(games);
  } catch (error) {
    res.status(500).send("Can't fetch the game data");
  }
};

exports.saveMoves = (req, res) => {};
