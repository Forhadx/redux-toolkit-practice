import React from "react";
import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Counter from "./components/CounterApp/Counter";

function App() {
  return (
    <div className="App">
      <header>
        <NavLink to="/">counter</NavLink>
        <NavLink to="posts">Posts</NavLink>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Counter />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
