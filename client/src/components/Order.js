import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../CartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";


export default function Order() {
    const cart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
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
            <div className="wrapper">
                <div className="order-wrapper">
                    <div className="order">
                        <h2 style={{ display: "flex", justifyContent: "center" }} >Récapitulatif de votre commande</h2>
                        {
                            cart.map((e) => {
                                return (
                                    <div key={e.id} className="carteorder">
                                        <p style={{ marginBottom: ".25rem" }}>{e.name}</p>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div style={{ display: "flex" }}>
                                                <button style={{ backgroundColor: "transparent", border: "none", color: "rgb(13,70,13)", fontSize: "20px" }} onClick={() => dispatch(decreaseQuantity(e.id))}>-</button>
                                                <p>Quantité : {e.selectedQuantity}</p>
                                                <button style={{ backgroundColor: "transparent", border: "none", color: "rgb(13,70,13)", fontSize: "20px" }} onClick={() => dispatch(increaseQuantity(e.id))}>+</button>
                                            </div>
                                            <p>{e.price * e.selectedQuantity} €</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="order-total">
                            <p style={{ marginBottom: ".25rem", display: "flex", justifyContent: "center" }}> Total : {reduce()} €</p>
                            <div className="ordernext">
                                    <Payment total= {reduce()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <p>Votre panier est vide</p>
        )
    }
}