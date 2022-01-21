import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../CartSlice";
import { useNavigate } from 'react-router-dom';
const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const client = {
    sandbox: paypalClientId,
}
const API_URL = process.env.REACT_APP_API_URL;

export default function Payment(props) {
    const cart = useSelector((state) => state.cart.value);
    const user_id = localStorage.getItem("user_id");
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  
    const order = () => {
        const array = [];
        cart.forEach((e) => {
            array.push({
                id: e.id,
                quantity: e.selectedQuantity,
                price: e.price,
            });
        });
        const data = {
            user_id:  user_id,
            guestData : props.guest, 
            adress: props.selectedAddress,
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
                shipping={1}
                style={{ color: "white" }}
                onSuccess={(data) => {
                    order();
                    dispatch(updateCart([])); 
                    sessionStorage.setItem("cart", []); 
                    navigate("/order-success");
                }}
                onError={(err) => {
                    setError(err)
                }}
            />
        </div>
    );
};

