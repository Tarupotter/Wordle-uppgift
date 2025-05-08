import React, { useState, useEffect } from "react";
import Highscore from "./Highscore";

function GameBoard() {
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [word, setWord] = useState("");
  const [length, setLength] = useState(5);
  const [allowRepeats, setAllowRepeats] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(null);

  const getWord = async () => {
    const response = await fetch("/api/randomWord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ length, allowRepeats }),
    });

    const data = await response.json();

    setWord(data.word);
  };

  const startGame = async () => {
    await getWord();
    setGameStarted(true);
    setGuesses([]);
    setStartTime(Date.now());
  };

  const handleGuess = async () => {
    if (guess.trim().length === length) {
      const response = await fetch("/api/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess, word }),
      });

      const data = await response.json();

      setGuesses([...guesses, { guess, feedback: data.feedback }]);
      setGuess("");

      if (data.correct) {
        const endTime = Date.now();
        const timeInSeconds = Math.floor((endTime - startTime) / 1000);

        setElapsedTime(timeInSeconds);
        setGameStarted(false);
        setShowPopup(true);
      } else if (guesses.length + 1 >= 8) {
        alert(`Tyvärr! Ordet var "${word}". Försök igen!`);
        setGameStarted(false);
      }
    } else {
      alert(`Gissningen måste vara ${length} bokstäver lång!`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGuess();
  };

  const handleSaveHighscore = async (highscoreData) => {
    const response = await fetch("/api/saveHighscore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(highscoreData),
    });

    setShowPopup(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGuess("");
    setGuesses([]);
    setWord("");
  };

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
                  <span key={i} className={`letter ${item.feedback[i].result}`}>
                    {letter}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showPopup && (
        <Highscore
          time={elapsedTime}
          guesses={guesses}
          word={word}
          settings={{ length, allowRepeats }}
          onSubmit={handleSaveHighscore}
        />
      )}
    </div>
  );
}

export default GameBoard;
