import React, { useState } from "react";

function Highscore({ time, guesses, word, settings, onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      
      onSubmit({
        name,
        time,
        guesses,
        settings,
      });
    } else {
      alert("Var god ange ett namn.");
    }
  };

  return (
    <div className="popup">
      <h2>Grattis! Du klarade det på {time} sekunder!</h2>
      <h2>Rätt ord var {word}</h2>
     <h2>Var god skriv ditt namn:</h2>
     <br/>
        <input
        className="highscore-input-field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      
      <button className="highscore-button"onClick={handleSubmit}>Spara highscore</button>
    </div>
  );
}

export default Highscore;
