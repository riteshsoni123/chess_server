const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  first: { type: String, required: true },
  second: { type: String, required: true },
  first_res: { type: String, required: true },
  second_res: { type: String, required: true },
  moves: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  moves_index: [
    {
      si: { type: Number, required: true },
      sj: { type: Number, required: true },
      ei: { type: Number, required: true },
      ej: { type: Number, required: true },
      deletedPiece: { type: String, default: "" },
    },
  ],
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
