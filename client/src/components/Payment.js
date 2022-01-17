import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../CartSlice";
const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const client = {
    sandbox: paypalClientId,
}
const API_URL = process.env.REACT_APP_API_URL;

export default function Payment(props) {
    const [success, setSuccess] = useState(null);
    const cart = useSelector((state) => state.cart.value);
    const user_id = localStorage.getItem("user_id");
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const order = (address) => {
        const array = [];
        cart.forEach((e) => {
            array.push({
                id: e.id,
                quantity: e.selectedQuantity,
                price: e.price,
            });
        });
        const data = {
            user_id,
            adress: {
                country: address.country_code,
                city: address.city,
                street: address.line1,
                number: 1,
                postal_code: address.postal_code,
            },
            order_price: reduce(),
            articles_id: array,
        };
        console.log(data);

        fetch(`${API_URL}/order/new`, {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(updateCart([]));
                if (res.status === "ok") {
                }
            })
            .catch((error) => console.error(error));
    }
    const reduce = () => {
        let total = cart[0].price * cart[0].selectedQuantity;
        for (let i = 1; i < cart.length; i++) {
            total += cart[i].price * cart[i].selectedQuantity;
        }
        return total;
    }

    return (
        <div>
            {error &&
                <p className="error">{error}</p>
            }
            <PaypalExpressBtn env={"sandbox"}
                client={client}
                currency={"EUR"}
                total={props.total}
                onSuccess={(data) => {
                    setSuccess(true);
                    order(data.address);
                    console.log(data);
                }}
                onError={(err) => {
                    setError(err)
                }}
            />
        </div>
    );
};

