import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import fs from "fs/promises";
import getFeedback from "./feedback.js";
import Highscore from "./src/models.js";

const app = express();
const port = 5080;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "../Backend/views");
app.use(express.json());
app.use(express.static("public"));

app.post("/api/randomWord", async (req, res) => {
  const { length, allowRepeats } = req.body;

  const data = await fs.readFile("./data/words.json", "utf8");
  const words = JSON.parse(data).words;
  let filteredWords = words.filter((w) => w.length === length);

  if (!allowRepeats) {
    filteredWords = filteredWords.filter((word) => {
      const hasRepeats = new Set(word).size !== word.length;

      return !hasRepeats;
    });
  }

  const randomWord =
    filteredWords[Math.floor(Math.random() * filteredWords.length)];

  res.json({ word: randomWord });
});

app.post("/api/guess", (req, res) => {
  const { guess, word } = req.body;

  const feedback = getFeedback(guess, word);
  const correct = guess.toLowerCase() === word.toLowerCase();

  res.json({ feedback, correct });
});

app.get("/highscore", async (req, res) => {
  const highscores = await Highscore.find().sort({ time: 1 }).limit(10).lean();

  res.render("highscore", {
    highscores: highscores,
  });
});

mongoose
  .connect("mongodb://localhost:27017/wordle")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.post("/api/saveHighscore", async (req, res) => {
  const { name, time, guesses, settings } = req.body;

  const highscore = new Highscore({
    name,
    time,
    guesses,
    settings,
  });

  await highscore.save();
  res.json({ message: "Highscore saved!" });
});

app.get("/about", async (req, res) => {
  const htmlText = await fs.readFile("./index.html");
  res.send(htmlText.toString());
});

app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});
