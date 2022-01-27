import "./App.css";
import "./index.css";
import "./styles/Profile.css";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Profile from "./components/Profile";
import ArticleEdit from "./components/admin/ArticleEdit";
import ArticleListing from "./components/ArticleListing";
import OrderListing from "./components/OrdersListing";
import OrderConfirm from "./components/OrderConfirm";
import Home from "./components/Home";
import Connexion from "./components/Connexion";
import ArticleDescription from "./components/ArticleDescription";
import Nav from "./components/Navigation";
import Order from "./components/Order";
import AdminArticles from "./components/admin/AdminArticles";
import Category from "./components/admin/AdminCategory";
import AdminPanel from "./components/admin/AdminPanel";
import SubscribeMysteryBox from "./components/SubscribeMysteryBox";
import PaymentSubscribe from "./components/PaymentSubscribe";
import { useSelector, useDispatch } from "react-redux";
import { updateAdmin } from "./AdminSlice";
import { setOpenCart, updateCart } from "./CartSlice";
import { setOpenProfil } from "./ProfilSlice";
import { updateFidel } from "./FidelSlice";
import { useEffect } from "react";
import MysteryBoxListing from "./components/MysteryBoxListing";
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  /* eslint-disable */
  const admin = useSelector((state) => state.admin.value);
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (user_id) {
      fetch(`${API_URL}/user/${user_id}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(updateAdmin(res.data.admin));
          dispatch(updateFidel(res.data.fidel));
        });
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dispatch(setOpenCart(false));
        dispatch(setOpenProfil(false));
      }
    });
    const tmpCart = sessionStorage.getItem("cart");
    if (tmpCart) {
      dispatch(updateCart(JSON.parse(tmpCart)));
    }
  }, []);

  return (
    <div className="App">
      <Router basename="/">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<OrderListing />} />
          <Route path="/article/edit/:id" element={<ArticleEdit />} />
          <Route path="/article/:id" element={<ArticleDescription />} />
          <Route path="/articles" element={<ArticleListing />} />
          <Route path="/articles/new" element={<ArticleListing new={true} />} />
          <Route
            path="/articles/promo"
            element={<ArticleListing promo={true} />}
          />
          <Route
            path="/articles/graines"
            element={<ArticleListing graines={true} />}
          />
          <Route
            path="/articles/accessoires"
            element={<ArticleListing accessoires={true} />}
          />
          <Route path="/auth" element={<Connexion />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route
            path="/order-success"
            element={<p>Paiement effectué avec succès</p>}
          />
          <Route path="/admin-category" element={<Category />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/admin-articles" element={<AdminArticles />} />
          <Route path="/mystery-boxes" element={<MysteryBoxListing />} />
          <Route
            path="/mystery-subscription"
            element={<SubscribeMysteryBox />}
          />
          <Route path="/PaymentSubscribe" element={<PaymentSubscribe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
