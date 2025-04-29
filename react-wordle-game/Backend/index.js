import express from 'express';

const app = express();
const port = 5080;

// URL till ordlistan på GitHub
const WORDS_URL = "https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json";

app.use(express.json()); 

app.post("/api/words", async (req, res) => {
  try {
    const { length } = req.body;

    const response = await fetch(WORDS_URL);
    const data = await response.json();

    const wordList = Object.keys(data).filter(word => word.length === length);

    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    res.json({ word: randomWord });
  } catch (error) {
    console.error("Fel vid hämtning av ord:", error);
    res.status(500).json({ error: "Serverfel vid hämtning av ord." });
  }
});

app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});
