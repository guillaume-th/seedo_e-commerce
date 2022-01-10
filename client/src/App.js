import './App.css';
import "./index.css";
import './styles/Profile.css'
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Profile from './components/Profile';
import ArticleEdit from './components/ArticleEdit';
import ArticleListing from './components/ArticleListing';
import Home from "./components/Home";
import Connexion from './components/Connexion';
import Nav from './nav/navbar';
import { useState } from "react";

function App() {
  const [cart, setCart] = useState(null);

  return (
    <div className="App">
      <Router basename='/'>
        <Nav cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/edit/:id" element={<ArticleEdit />} />
          <Route path="/articles" element={<ArticleListing  />} />
          <Route path="/auth" element={<Connexion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;