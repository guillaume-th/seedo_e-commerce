import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

export default function Cart() {
    const cart = useSelector((state) => state.cart.value);

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
                <div>
                    <p style={{ marginBottom: ".25rem" }}> Total : {reduce()}</p>
                    {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>{e.selectedQuantity}</p>
                        <p>{e.price * e.selectedQuantity} €</p>
                    </div> */}
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