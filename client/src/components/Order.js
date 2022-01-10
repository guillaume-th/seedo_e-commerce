import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../CartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
            <div className="order">
                <h2>Récapitulatif de votre commande</h2>
                {
                    cart.map((e) => {
                        return (
                            <div key={e.id}>
                                <p style={{ marginBottom: ".25rem" }}>{e.name}</p>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex" }}>
                                        <button onClick={() => dispatch(decreaseQuantity(e.id))}>-</button>
                                        <p>Quantité : {e.selectedQuantity}</p>
                                        <button onClick={() => dispatch(increaseQuantity(e.id))}>+</button>
                                    </div>
                                    <p>{e.price * e.selectedQuantity} €</p>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="cart-total">
                    <p style={{ marginBottom: ".25rem" }}> Total : {reduce()} €</p>
                    <button style={{ fontSize: "1.25rem", width: "90%" }}
                    onClick={()=> navigate("/order-confirm")}
                    >
                        Passer à l'étape suivante
                    </button>
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