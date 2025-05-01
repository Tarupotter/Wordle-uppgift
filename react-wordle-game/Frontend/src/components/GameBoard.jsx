import React, { useState, useEffect } from "react";
import feedback from "./Feedback";

function GameBoard() {
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [word, setWord] = useState("");
  const [length, setLength] = useState(5); 
  const [allowRepeats, setAllowRepeats] = useState(true); 


 // Hämtar ett slumpmässigt ord när spelet startar eller längden på ordet ändras
 const getWords = async () => {
  try {
    const response = await fetch('/api/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ length }) // skicka med vald ordlängd
    });

    const payload = await response.json();

    if (payload && payload.word) {
      setWord(payload.word);
    } else {
      setWord("default");
    }
  } catch (error) {
    setWord("default");
  }
};

const startGame = async () => {
  await getWords(); // hämta ord med rätt längd innan spelet startar
  setGameStarted(true);
};


const handleGuess = () => {
  if (guess.trim().length === length) {
    const guessFeedback = feedback(guess, word);  // Använd feedback här
    setGuesses([...guesses, { guess, feedback: guessFeedback }]);
    setGuess("");  // Återställ gissningen
  } else {
    alert(`Gissningen måste vara ${length} bokstäver lång!`);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGuess();
  };

 
const resetGame = () => {
  setGameStarted(false);
  setGuess("");
  setGuesses([]);
  setWord("");
};

useEffect(() => {
  if (guesses.length > 0 && guesses[guesses.length - 1] === word) {
    alert("Grattis! Du gissade rätt!");
    setGameStarted(false);
  } else if (guesses.length >= 8) {
    alert(`Tyvärr! Ordet var "${word}". Försök igen!`);
    setGameStarted(false);
  }
}, [guesses]);

 

  return (
    <div className="game-board">
      <h1 className="game-title">WORDLE</h1>

      {!gameStarted ? (
        <div className="settings">
          <h2 className="settings-title">Välj inställningar</h2>

          <div className="settings-item">
            <label className="settings-label">
              Ordets längd:
              <select
                className="settings-select"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              >
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </select>
            </label>
          </div>

          <div className="settings-item">
            <label className="settings-label">
              Tillåt upprepade bokstäver:
              <input
                className="settings-checkbox"
                type="checkbox"
                checked={allowRepeats}
                onChange={(e) => setAllowRepeats(e.target.checked)}
              />
            </label>
          </div>

          <button className="start-button" onClick={startGame}>
            Starta spelet
          </button>
        </div>
      ) : (
        <div className="game-play">
          <div className="guess-input">
            <input
              className="guess-input-field"
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Skriv din gissning här"
              maxLength={length} 
            />
          </div>
  <button className="guess-button" onClick={handleGuess}>
              Gissa
            </button>
          <button className="reset-button" onClick={resetGame}>
   Omstart
  </button>

  <ul className="guess-list">
  {guesses.map((item, index) => (
    <li key={index} className="guess-item">
      {item.guess.split("").map((letter, i) => (
        <span
          key={i}
          className={`letter ${item.feedback[i].result}`} 
        >
          {letter}
        </span>
      ))}
    </li>
  ))}
</ul>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
