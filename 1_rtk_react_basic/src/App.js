import React from "react";
import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Counter from "./components/CounterApp/Counter";
import PostApp from "./components/PostsApp/PostApp";

function App() {
  return (
    <div className="App">
      <header>
        <NavLink to="/">counter</NavLink>
        <NavLink to="/posts">Posts</NavLink>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/posts" element={<PostApp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
