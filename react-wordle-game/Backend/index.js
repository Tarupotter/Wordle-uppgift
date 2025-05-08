import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs/promises'; 
import getFeedback from './feedback.js';
import Highscore from './src/models.js';

const app = express();
const port = 5080;


app.use(express.json());

app.post('/api/randomWord', async (req, res) => {
    const { length } = req.body;

    const data = await fs.readFile('./data/words.json', 'utf8');
    const words = JSON.parse(data).words;

    const filteredWords = words.filter((w) => w.length === length);
    
    const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];

    res.json({ word: randomWord });
});


app.post('/api/guess', (req, res) => {
  const { guess, word } = req.body;

  const feedback = getFeedback(guess, word);
  const correct = guess.toLowerCase() === word.toLowerCase();

  res.json({ feedback, correct });
});

app.get('/highscore', async (req, res) => {
  const htmlText = await fs.readFile('./highscore.handlebars');
  res.send(htmlText.toString());
});


mongoose.connect('mongodb://localhost:27017/wordle')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.post('/api/saveHighscore', async (req, res) => {
  const { name, time, guesses, settings } = req.body;

  try {
    const highscore = new Highscore({
      name,
      time,
      guesses,
      settings,
    });
   
    await highscore.save();  // Spara till databasen
    res.json({ message: 'Highscore saved!' });
  } catch (error) {
    console.error('Error saving highscore:', error);
    res.status(500).json({ message: 'Error saving highscore' });
  }
});


app.get('/about', async (req, res) => {
  const htmlText = await fs.readFile('./index.html');
  res.send(htmlText.toString());
});


app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});
