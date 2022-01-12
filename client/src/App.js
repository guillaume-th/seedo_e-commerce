import "./App.css";
import "./index.css";
import "./styles/Profile.css";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Profile from "./components/Profile";
import ArticleEdit from "./components/admin/ArticleEdit";
import ArticleListing from "./components/ArticleListing";
import Home from "./components/Home";
import Connexion from "./components/Connexion";
import Nav from "./components/Navigation";
import Order from "./components/Order";
import OrderConfirm from "./components/OrderConfirm";
import AdminArticles from "./components/admin/AdminArticles";
import Category from "./components/Category";
import AdminPanel from "./components/admin/AdminPanel";
import { useSelector, useDispatch } from "react-redux";
import { updateAdmin } from "./AdminSlice";
import { useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  /* eslint-disable */
  const admin = useSelector((state) => state.admin.value);
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    console.log(admin, user_id);
    if (user_id) {
      fetch(`${API_URL}/user/${user_id}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(updateAdmin(res.data.admin));
        });
    }
  }, []);

  return (
    <div className="App">
      <Router basename="/">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/article/edit/:id" element={<ArticleEdit />} />
          <Route path="/articles" element={<ArticleListing />} />
          <Route path="/auth" element={<Connexion />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/admin-articles" element={<AdminArticles />} />
          <Route path="/admin-category" element={<Category />} />
          <Route path="/admin-panel" element={<AdminPanel/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
