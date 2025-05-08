import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Number, required: true },
  guesses: { type: Array, required: true },
  settings: {
    length: { type: Number, required: true },
    allowRepeats: { type: Boolean, required: true },
  },
});

const Highscore = mongoose.model("Highscore", highscoreSchema);

export default Highscore;
