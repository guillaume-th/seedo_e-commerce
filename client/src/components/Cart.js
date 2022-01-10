import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

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
    }

    if (cart.length > 0) {
        return (
            <div className="cart">
                <div style={{ position: "relative", height: "100%" }}>
                    {
                        cart.map((e) => {
                            return (
                                <div key={e.id}>
                                    <p style={{ marginBottom: ".25rem" }}>{e.name}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p>{e.selectedQuantity}</p>
                                        <p>{e.price * e.selectedQuantity} €</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="cart-total">
                        <p style={{ marginBottom: ".25rem" }}> Total : {reduce()} €</p>
                        <button style={{ fontSize: "1.25rem", width: "90%" }}
                            onClick={() => navigate("/order")}
                        >
                            Passer la commande
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="cart">
                <p>Pas de produits dans le panier</p>
            </div>
        );
    }

}