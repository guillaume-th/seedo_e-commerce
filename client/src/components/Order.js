import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../CartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reduce } from "../utils";
const BING_API_KEY = process.env.REACT_APP_BING_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export default function Order() {
    const [shippingPriceDistance, setShippingPriceDistance] = useState(null);
    const cart = useSelector((state) => state.cart.value);
    const fidel = useSelector((state) => state.fidel.value);
    const [shipping, setShipping] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getShippingFees();
    }, [cart]);

    const getShippingFees = () => {

        fetch(`${API_URL}/shipping/all`)
            .then(res => res.json())
            .then(res => {
                const priceByKg = Number(res.weight);
                const weight = computeWeight();
                setShippingPriceDistance(res.distance);
                setShipping(Number(weight * priceByKg).toFixed(2));
            });
    }

    const computeWeight = () => {
        let total = 0;
        cart.forEach(e => total += e.weight * e.selectedQuantity);
        return total;
    }
    const noel95 = new Date('december 22, 69 00:20:18');
    const mois = noel95.getMonth();

    if (cart.length > 0) {
        return (
            <div className="wrapper">
                <div className="order-wrapper">
                    <div className="order">
                        <h2 style={{ display: "flex", justifyContent: "center" }} >Récapitulatif de votre commande</h2>
                        {fidel
                            && <p>Vous faites partie de notre programme de fidélité ! Profitez de -10% de réduction sur votre commande !</p>
                        }
                        {
                            cart.map((e) => {
                                return (
                                    <div key={e.id} className="carteorder card">
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
                            <p style={{ display: "flex", justifyContent: "center" }}> Total : {reduce(cart)} €</p>
                            {fidel &&
                                <p style={{ marginBottom: ".25rem", display: "flex", justifyContent: "center" }}> Total (-10%) : {(reduce(cart)) * 0.9} €</p>
                            }
                            {/* {(reduce(cart) > 150) && <span className="thumbnail"> Emballage cadeau offert ❤️‍🔥</span>} */}
                            <p style={{ marginBottom: ".25rem", display: "flex", justifyContent: "center" }}> Poids de la commande : {computeWeight()} kg</p>
                            <p style={{ marginBottom: ".25rem", display: "flex", justifyContent: "center" }}> Livraison : {shipping} €</p>
                            <span>La livraison est susceptible de changer en fonction de votre adresse</span>
                            <div className="ordernext">
                                <button onClick={() => navigate("/order-confirm", { state: { distance: shippingPriceDistance, shippingWeight: shipping } })}>Passer à l'étape suivante</button>
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