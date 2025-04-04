import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <> 
    <nav className="navbar">
      <ul>
        <li>
          <a href="highscore">HIGHSCORE</a>
          </li>
          <li>
          <a href="information">INFORMATION</a>
          </li>
      </ul>
    </nav>
    <form className="form">
      
      <h1>WORDLE GAME</h1>

      <div className="quantity-section">
      <label for="quantity">Number of letters:</label>
      <select id="quantity" name="quantity">
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
      </div>

      <div className="letter-input">
        <input className="letter-input-field" maxlength="1"></input>
        <input className="letter-input-field" maxlength="1"></input>
        <input className="letter-input-field" maxlength="1"></input>
        <input className="letter-input-field" maxlength="1"></input>
        <input className="letter-input-field" maxlength="1"></input>
        <input className="letter-input-field" maxlength="1"></input>
      </div>

      <input className="word-input"></input>
      <button className="add-word-button">Guess</button>
    </form>
    </>
  );
}

export default App;
