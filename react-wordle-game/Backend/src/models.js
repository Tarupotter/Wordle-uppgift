import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: String,
  time: Number,
  guesses:Array,
  settings: {
    length: Number,
    allowRepeats: Boolean,
  },
});

const Highscore = mongoose.model("Highscore", highscoreSchema);

export default Highscore;
