import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Page from "./components/Page";
import Article from "./components/Article";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/page" element={<Page />} />
        <Route path="/createArticle" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;
