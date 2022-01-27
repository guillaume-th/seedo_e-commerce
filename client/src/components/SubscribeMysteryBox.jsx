import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

export default function SubscribeMysteryBox(state) {
  const navigate = useNavigate();
  const prop = useLocation().state;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/mystery/mystery_show/${prop.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res.result))
      .catch((error) => console.error(error));
  }, []);

  if (data) {
    const priceByMonth = data.subscrition_price / 12;
    return (
      <div id="subscription">
        <h2>{data.name}</h2>
        {data.photo[0]}
        <div className="description-mystery">
          <p>
            Description : <span>{data.description}</span>
          </p>
        </div>
        <div className="prix">
          <p>
            Prix a l'année : {data.subscrition_price}€ <br />
            <span className="min">
              (soit {priceByMonth.toFixed(2)}€/mois pendant 1 an)
            </span>
          </p>
        </div>
        <button
          onClick={() =>
            navigate("/subscribe-order-confirm", {
              state: { data: data, id: prop.id },
            })
          }
        >
          Procedez au paiement
        </button>
      </div>
    );
  } else {
    return <p>Chargement en cours ...</p>;
  }
}
