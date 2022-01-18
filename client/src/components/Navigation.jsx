import React, { useState, useEffect } from "react";
import User from "../assets/user.svg";
import Shop from "../assets/shop.svg";
import Logo from "../assets/logoSeedo.png";
import AdminLogo from "../assets/admin.svg";
import Search from "../assets/searchWhite.png";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { useSelector } from "react-redux";
const API_URL = process.env.REACT_APP_API_URL;

export default function Navbar(props) {
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);
  const admin = useSelector((state) => state.admin.value);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/article/all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setArticles(res))
      .catch((error) => console.error(error));
  }, []);

  const handleCart = () => {
    setOpenCart(!openCart);
  };

  function search(string) {
    let result = [];
    articles.map((e) => {
      if (e.data.name.match(string) && string != "") {
        result.push(e.data);
      }
    });
    console.log(result);
  }

  return (
    <div id="navbar">
      <div id="logo" onClick={() => navigate("/")}>
        <img id="graine" src={Logo} alt="Seed_logo" />
      </div>
      <form className="search_bar">
        <input
          onChange={(e) => search(e.target.value)}
          className="search"
          id="search"
          type="text"
          placeholder="Search"
        />
        <img id="loupe" src={Search} alt="search_logo" />
        div
      </form>

      <div id="icon">
        {admin && (
          <img
            src={AdminLogo}
            alt="Admin-logo"
            id="Admin"
            onClick={() => navigate("/admin-panel")}
          />
        )}
        <img id="Shop" src={Shop} alt="Shop_logo" onClick={handleCart} />
        <img
          id="User"
          src={User}
          onClick={() => navigate("/profile")}
          alt="User_logo"
        />
        {openCart && <Cart />}
      </div>
    </div>
  );
}
