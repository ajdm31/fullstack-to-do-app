import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"


import { Home, TodoList } from './pages';
import { Nav } from './layout'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/folder/:id" element={<TodoList />} />

        <Route path="/list" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
