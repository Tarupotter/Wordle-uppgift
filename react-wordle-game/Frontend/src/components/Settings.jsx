// Settings.js
export default function Settings({ length, setLength, allowRepeats, setAllowRepeats, startGame }) {
    return (
      <div className="settings-container">
        <h2>Inställningar</h2>
  
        <label>
          Antal bokstäver:
          <select
            value={length}
            onChange={(e) => setLength(Number(e.target.value))} 
          >
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </label>
  
        <br />
  
        <label>
          Tillåt upprepade bokstäver:
          <input
            type="checkbox"
            checked={allowRepeats}
            onChange={() => setAllowRepeats(!allowRepeats)} // Växla mellan tillåtet eller inte
          />
        </label>
  
        <br />
    
        <p>Du har valt: {length} bokstäver</p>
        <p>Tillåt upprepade bokstäver: {allowRepeats ? "Ja" : "Nej"}</p>
  
        <br />
        <button className="settings-button" onClick={startGame}>Starta spel</button>
    
      </div>
    );
  }
  