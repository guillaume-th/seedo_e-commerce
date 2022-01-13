import "./App.css";
import "./index.css";
import "./styles/Profile.css";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Profile from "./components/Profile";
import ArticleEdit from "./components/admin/ArticleEdit";
import ArticleListing from "./components/ArticleListing";
import Home from "./components/Home";
import Connexion from "./components/Connexion";
import ArticleDescription from "./components/ArticleDescription";
import Nav from "./components/Navigation";
import Order from "./components/Order";
import OrderConfirm from "./components/OrderConfirm";
import AdminArticles from "./components/admin/AdminArticles";
<<<<<<< HEAD
=======
import Category from "./components/admin/AdminCategory";
import AdminPanel from "./components/admin/AdminPanel";
>>>>>>> 03ec86e9e4064469a2b1f265010ee1d3e507e1bb
import { useSelector, useDispatch } from "react-redux";
import { updateAdmin } from "./AdminSlice";
import { useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  /* eslint-disable */
<<<<<<< HEAD
  const admin = useSelector(state => state.admin.value);
=======
  const admin = useSelector((state) => state.admin.value);
>>>>>>> 03ec86e9e4064469a2b1f265010ee1d3e507e1bb
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
<<<<<<< HEAD
    console.log(admin, user_id); 
    if (user_id) {
      fetch(`${API_URL}/user/${user_id}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(updateAdmin(res.data.admin));
      })
=======
    console.log(admin, user_id);
    if (user_id) {
      fetch(`${API_URL}/user/${user_id}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(updateAdmin(res.data.admin));
        });
>>>>>>> 03ec86e9e4064469a2b1f265010ee1d3e507e1bb
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
          <Route path="/article/:id" element={<ArticleDescription />} />
          <Route path="/articles" element={<ArticleListing />} />
          <Route path="/auth" element={<Connexion />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/admin-articles" element={<AdminArticles />} />
<<<<<<< HEAD
=======
          <Route path="/admin-category" element={<Category />} />
          <Route path="/admin-panel" element={<AdminPanel/>}/>
>>>>>>> 03ec86e9e4064469a2b1f265010ee1d3e507e1bb
        </Routes>
      </Router>
    </div>
  );
}

export default App;
