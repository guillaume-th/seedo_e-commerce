import PaypalExpressBtn from "react-paypal-express-checkout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../CartSlice";
import { useNavigate } from "react-router-dom";
import { reduce } from "../utils";
const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const client = {
  sandbox: paypalClientId,
};
const API_URL = process.env.REACT_APP_API_URL;

export default function PaymentMystery(props) {
  const fidel = useSelector((state) => state.fidel.value);
  const user_id = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const order = () => {
    const data = {
      user_id: user_id,
      guestData: props.guest,
      adress: props.selectedAddress,
      order_price: props.total,
      articles_id: props.mysteryBoxId,
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
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <PaypalExpressBtn
        env={"sandbox"}
        client={client}
        currency={"EUR"}
        total={props.total}
        shipping={1}
        style={{ color: "white" }}
        onSuccess={(data) => {
          order();
          navigate("/order-success");
        }}
        onError={(err) => {
          setError(err);
        }}
      />
    </div>
  );
}
