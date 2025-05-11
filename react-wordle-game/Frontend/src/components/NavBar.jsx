import React from 'react';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/" className={window.location.pathname === "/" ? "active" : ""}>Home</a></li>
        <li className="navbar-item"><a href="/about" className={window.location.pathname === "/about" ? "active" : ""}>About</a></li>
        <li className="navbar-item"><a href="/highscore" className={window.location.pathname === "/highscore" ? "active" : ""}>Highscore</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;