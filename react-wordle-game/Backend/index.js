import express from 'express';
import fs from 'fs/promises'; 
import getFeedback from './feedback.js';

const app = express();
const port = 5080;


app.use(express.json());

app.post('/api/randomWord', async (req, res) => {
    const { length } = req.body;

    const data = await fs.readFile('words.json', 'utf8');
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


app.get('/about', async (req, res) => {
  const htmlText = await fs.readFile('./index.html');
  res.send(htmlText.toString());
});


app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});
