import React from "react";
import Filters from "./components/Filters";
import CallList from "./components/CallList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Filters />
      <CallList />
    </div>
  );
}

export default App;
