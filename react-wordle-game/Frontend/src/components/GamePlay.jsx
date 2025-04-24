import Feedback from './Feedback';

export default function GamePlay({ secretWord, guess, setGuess, feedback, setFeedback, history, setHistory, resetGame }) {

  const getFeedback = (guess, answer) => {
    return [...guess.toUpperCase()].map((letter, i) => ({
      letter,
      result: letter === answer[i].toUpperCase() ? 'correct' :
              answer.toUpperCase().includes(letter) ? 'misplaced' : 'incorrect'
    }));
  };

  const handleGuess = () => {
    if (guess.length !== secretWord.length) {
      alert(`Din gissning måste vara ${secretWord.length} bokstäver!`);
      return;
    }

    const result = getFeedback(guess, secretWord);
    setFeedback(result);
    setHistory([...history, { guess, feedback: result }]);
    setGuess('');

    if (guess.toLowerCase() === secretWord.toLowerCase()) {
      setTimeout(() => {
        alert('Rätt ord! Bra jobbat!');
      }, 100);
    }
  };

  return (
    <div className="guess-container">
      <input
        className="guess-input"
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toLowerCase())}
        placeholder="Skriv din gissning"
        maxLength={secretWord.length}
      />
      

      <button className="settings-button" onClick={handleGuess}>Gissa</button>

      <br />
      <h3>GISSADE ORD</h3>
      {history.map((item, index) => (
        <div key={index}>
          <Feedback feedback={item.feedback} />
        </div>
      ))}

      <br />
      <button onClick={resetGame} className="settings-button">Börja om</button>
    </div>
  );
}
