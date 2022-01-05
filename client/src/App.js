import './App.css';
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Profile from './components/Profile';

function App() {
  return (  
    <div className="App">
      <Router basename='/'>
        <Routes>
          <Route path="/" element={<div>Hello</div>}/>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
