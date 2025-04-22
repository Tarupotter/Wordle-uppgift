import { useState } from 'react';
import Settings from './Settings';
import GamePlay from './GamePlay';



export default function Game() {
  const [length, setLength] = useState(5);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [allowRepeats, setAllowRepeats] = useState(true);
  const [secretWord, setSecretWord] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [history, setHistory] = useState([]);

  const wordList = [
    'start', 'glass', 'smile', 'hello', 'sweep',
    'trees', 'smart', 'grape', 'pride', 'trace',
    'plane', 'globe', 'light', 'candy', 'brush',
    'chair', 'blame', 'track', 'grind', 'flame'
  ];

  const getFilteredWords = () => {
    return wordList.filter(word => {
      const correctLength = word.length === length;
      const noRepeats = new Set(word).size === word.length;
      return correctLength && (allowRepeats || noRepeats);
    });
  };

  const startGame = () => {
    const filtered = getFilteredWords();
    if (filtered.length === 0) {
      alert('Inga ord hittades med dessa inställningar!');
      return;
    }
    const randomWord = filtered[Math.floor(Math.random() * filtered.length)];
    setSecretWord(randomWord);
    setIsGameStarted(true);
  };

  return (
    <div>
      {!isGameStarted ? (
        // Inte startat
        <Settings
          length={length}
          setLength={setLength}
          allowRepeats={allowRepeats}
          setAllowRepeats={setAllowRepeats}
          startGame={startGame}
        />
      ) : (
        // Startat
        <GamePlay
          secretWord={secretWord}
          guess={guess}
          setGuess={setGuess}
          feedback={feedback}
          setFeedback={setFeedback}
          history={history}
          setHistory={setHistory}
          resetGame={() => {
            setIsGameStarted(false);
            setGuess('');
            setFeedback([]);
            setSecretWord('');
            setHistory([]);
          }}
        />
      )}
    </div>
  );
}
