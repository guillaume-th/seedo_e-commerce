import React, { useState, useEffect } from "react";
import User from "../assets/user.svg";
import Shop from "../assets/shop.svg";
import Logo from "../assets/logoSeedo.png";
import AdminLogo from "../assets/admin.svg";
import Search from "../assets/loupe-green.svg";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import ProfilDropdown from "./ProfilDropdown.js";
import { setOpenCart } from "../CartSlice";
import { setOpenProfil } from "../ProfilSlice";
import { useSelector, useDispatch } from "react-redux";


const API_URL = process.env.REACT_APP_API_URL;

export default function Navbar(props) {
  const navigate = useNavigate();
  const [productDropdown, setProductDropdown] = useState(false);
  const openCart = useSelector((state) => state.cart.open);
  const openProfil = useSelector((state) => state.profil.open);
  const admin = useSelector((state) => state.admin.value);
  const dispatch = useDispatch();
  const [articles, setArticles] = useState(null);
  const [foundSearch, setFoundSearch] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/article/all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setArticles(res))
      .catch((error) => console.error(error));
  }, []);

  useEffect((e) => {
    document.getElementById("products")?.addEventListener("mouseover", (e) => {
      setProductDropdown(true);
      document.getElementById("products")?.addEventListener("mouseleave", (e) => {
        setProductDropdown(false);
      });
    });
  }, [foundSearch]);

  const handleCart = () => {
    if (openProfil) {
      dispatch(setOpenProfil(false))
    }
    dispatch(setOpenCart(!openCart));
  };

  const handleProfil = () => {
    if (openCart) {
      dispatch(setOpenCart(false))
    }
    dispatch(setOpenProfil(!openProfil));
  };

  function search(string) {
    const search = new RegExp(string, "gi");
    let result = [];
    articles.forEach((e) => {
      if (e.data.name.match(search) && string !== "") {
        result.push(e.data);
      }
    });
    setFoundSearch(result);
  }

  function navigateById(id) {
    navigate(`/article/${id}`);
  }

  return (
    <div className="navbar-wrapper">
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
          {foundSearch.length > 0 &&
            <ul
              id="article-container"
              style={{ backgroundColor: "white", opacity: "100%", width:"35.5%", border:"2px solid darkgreen", borderTop:"none", borderRadius:"0px",transform:"translate(10px, -8px)" }}
            >
              {foundSearch.map((e) => (
                <li
                  className="list-article"
                  onClick={(element) => {
                    navigateById(e.id);
                    element.target.parentElement.parentElement.children[0].value =
                      "";
                    setFoundSearch([]);
                  }}
                >
                  {e.name}
                </li>
              ))}
            </ul>
          }

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
            onClick={handleProfil}
            alt="User_logo"
          />
          {openCart && <Cart />}
          {openProfil && <ProfilDropdown />}
        </div>
      </div>
      <div className="sub-nav">
        <div onClick={() => navigate("/articles/new")}>Nouveautés</div>
        <div onClick={() => navigate("/articles/promo")}>Promotions</div>
        <div onClick={()=> navigate("/mystery-boxes")}>Mystery box </div>
        <div onClick={()=>navigate("/articles/graines")}>Graines</div>
        <div onClick={() => navigate("/articles/accessoires")}>Accessoires</div>
      </div>
    </div>
  );
}
