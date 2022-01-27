/* eslint-disable */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenCart, updateCart } from "../CartSlice";
import { useNavigate } from "react-router-dom";
import { reduce } from "../utils";
import "../styles/Cart.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart.value);
  const fidel = useSelector((state) => state.fidel.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if(savedCart){
      dispatch(updateCart(JSON.parse(savedCart)));
    }
  }, []);

  if (cart.length > 0) {
    return (

      <div className="cart">
        <div className="cart-child">
          {fidel &&
              <p>Vous bénéficiez de -10% sur votre panier !</p>
          }
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
            <div className="cart-price">
              {fidel ?
                <p>Total : {(reduce(cart))*0.9} €</p> :
                <p>Total : {reduce(cart)} €</p>
              }  
            </div>
            <button
              style={{ fontSize: "1.25rem", width: "90%" }}
              onClick={() => {
                dispatch(setOpenCart(false));
                navigate("/order");
              }}
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
