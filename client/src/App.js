import './App.css';
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Profile from './components/Profile';
import ArticleEdit from './components/ArticleEdit';
import ArticleListing from './components/ArticleListing';
import ListArticles from './components/ListArticles';

function App() {
  return (  
    <div className="App">
      <Router basename='/'>
        <Routes>
          <Route path="/" element={<div>Hello</div>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/edit/:id" element={<ArticleEdit />} />
          <Route path="/articles" element={<ArticleListing />} />
          <Route path="/product" element={<ListArticles />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;