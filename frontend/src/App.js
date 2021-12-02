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

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/list" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
