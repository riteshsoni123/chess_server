const express = require("express");
const router = express.Router();
const { playGame, getGameList, saveResult } = require("../controllers/game");

router.route("/play").get(playGame);

router.route("/saveResult").post(saveResult);

router.route("/getGameList/:username").get(getGameList);

module.exports = router;
