import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BibleVerse from "./BibleVerse";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <BibleVerse></BibleVerse>
        </div>
      </header>
    </div>
  );
}

export default App;
