<<<<<<< HEAD
import './App.css';
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Profile from './components/Profile';
import ArticleEdit from './components/ArticleEdit';
import ArticleListing from './components/ArticleListing';

=======
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './nav/navbar';
>>>>>>> Wassim
function App() {
  return (  
    <div className="App">
<<<<<<< HEAD
      <Router basename='/'>
        <Routes>
          <Route path="/" element={<div>Hello</div>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/edit/:id" element={<ArticleEdit />} />
          <Route path="/articles" element={<ArticleListing />} />
        </Routes>
      </Router>
=======
     <Nav/>
>>>>>>> Wassim
    </div>
  );
}

export default App;
