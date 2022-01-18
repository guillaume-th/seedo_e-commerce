/* eslint-disable */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart.value);
  const navigate = useNavigate();

  useEffect(() => {
    // setData(JSON.parse(localStorage.getItem("cart")));
  }, [cart]);

  const reduce = () => {
    let total = cart[0].price * cart[0].selectedQuantity;
    for (let i = 1; i < cart.length; i++) {
      total += cart[i].price * cart[i].selectedQuantity;
    }
    return total;
  };

  if (cart.length > 0) {
    return (
      
      <div className="cart">
        <div className="cart-child">
          {cart.map((e) => {
            return (
              <div key={e.id}>
                <p style={{ marginBottom: ".25rem" }}>{e.name}</p>
                <div className="cart-elm"
                 
                >
                  <p>Qte : {e.selectedQuantity}</p>
                  <p>{e.price * e.selectedQuantity} €</p>
                </div>
              </div>
            );
          })}
          <div className="cart-total">
            <div  className="cart-price">
              <p>Total : {reduce()} €</p>
            </div>
            <button
              style={{ fontSize: "1.25rem", width: "90%" }}
              onClick={() => navigate("/order")}
            >
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart">
        <p>Pas de produits dans le panier</p>
      </div>
    );
  }
}
