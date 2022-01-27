import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/OrderConfirm.css";
import { reduce } from "../utils";
import Payment from "./Payment";
const API_URL = process.env.REACT_APP_API_URL;

export default function OrderConfirm(props) {
  const [userData, setUserData] = useState(null);
  const [user_id, setUserId] = useState(localStorage.getItem("user_id"));
  const parent = useLocation().props;
  const navigate = useNavigate();
  const [selectedAdress, setSelectedAdress] = useState(null);
  const newAdressForm = useRef();
  const guestAdressForm = useRef();
  const subscription = parent.subscrition_price;
  const fidel = useSelector((state) => state.fidel.value);
  const [error, setError] = useState(null);
  const [shipping, setShipping] = useState(null);
  console.log(props);
  useEffect(() => {
    if (user_id !== null) {
      fetch(`${API_URL}/user/${user_id}`)
        .then((res) => res.json())
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }
    if (selectedAdress) {
      for (let elt of document.getElementsByClassName("order-adress")) {
        elt.classList.remove("selected-adress");
      }
      document
        .getElementById(selectedAdress.id)
        .classList.add("selected-adress");
    }

    /* eslint-disable */
  }, [selectedAdress, user_id]);

  const addAdress = (e) => {
    e.preventDefault();
    const data = new FormData(newAdressForm.current);
    fetch(`${API_URL}/user/${user_id}/adress`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "ok") {
          setUserData(res.data);
        }
      })
      .catch((error) => console.error(error));
    for (const elt of document.getElementsByClassName("input-profile")) {
      elt.value = "";
    }
  };

  const addGuest = (e) => {
    e.preventDefault();
    const data = new FormData(guestAdressForm.current);
    fetch(`${API_URL}/user/inscription`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        if (res.status !== "ok") {
          setError(res.status);
        }
        if (res.user_id) {
          setUserId(res.user_id);
        }
      })
      .catch((err) => console.error(err));
  };

  if (userData) {
    return (
      <div className="order-confirm-style">
        {error && <p className="error">{error}</p>}
        <h3>Choisissez une adresse de livraison</h3>
        <div className="order-confirm-adresses">
          {userData.adresses.length > 0 ? (
            <div>
              {userData.adresses.map((e) => {
                return (
                  <div
                    id={e.id}
                    key={e.id}
                    onClick={() => setSelectedAdress(e)}
                    className="carteorder oui order-adress"
                  >
                    <p className="">
                      {e.number} {e.street}{" "}
                    </p>
                    <p className="">
                      {e.city} {e.postal_code}, {e.country}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <form
                className="vertical-form"
                ref={newAdressForm}
                onSubmit={addAdress}
                encType="multipart/form-data"
              >
                <input
                  required
                  type="text"
                  className="input-profile"
                  name="number"
                  placeholder="Numéro"
                ></input>
                <input
                  required
                  type="text"
                  className="input-profile"
                  name="street"
                  placeholder="Rue"
                ></input>
                <input
                  required
                  type="text"
                  className="input-profile"
                  name="city"
                  placeholder="Ville"
                ></input>
                <input
                  required
                  type="text"
                  className="input-profile"
                  name="postal_code"
                  placeholder="Code Postal"
                ></input>
                <input
                  required
                  type="text"
                  className="input-profile"
                  name="country"
                  placeholder="Pays"
                ></input>
                <input
                  required
                  type="submit"
                  value="Utiliser cette adresse"
                ></input>
              </form>
            </div>
          )}
        </div>
        {selectedAdress ? (
          <div>
            <div>
              <p>
                Prix de la commande :{" "}
                {fidel ? subscription * 0.9 : subscription}
              </p>
              <p>Frais de livraison: {shipping}</p>
              <p>
                Prix total :
                {fidel
                  ? (
                      parseFloat(subscription) * 0.9 +
                      parseFloat(shipping)
                    ).toFixed(2)
                  : parseFloat(subscription) + parseFloat(shipping)}
              </p>
            </div>
            <Payment
              total={
                fidel
                  ? (
                      parseFloat(subscription) * 0.9 +
                      parseFloat(shipping)
                    ).toFixed(2)
                  : parseFloat(subscription) + parseFloat(shipping)
              }
              selectedAddress={selectedAdress}
            />
          </div>
        ) : (
          <p className="bill-message">
            Choisissez une adresse pour passer au paiement
          </p>
        )}
      </div>
    );
  } else {
    if (user_id) {
      return <p>Chargement en cours...</p>;
    } else {
      return (
        <div>
          <p>
            Rentrez vos informations ou{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/auth")}
            >
              <strong>connectez-vous</strong>
            </span>
          </p>
          {error && <p className="error">{error}</p>}
          <form
            className="vertical-form"
            ref={guestAdressForm}
            onSubmit={addGuest}
            encType="multipart/form-data"
          >
            <label>Prénom</label>
            <input
              required
              type="text"
              className="input-profile"
              name="firstname"
              placeholder="John"
            ></input>
            <label>Nom</label>
            <input
              required
              type="text"
              className="input-profile"
              name="lastname"
              placeholder="Doe"
            ></input>
            <label>Email</label>
            <input
              required
              type="email"
              className="input-profile"
              name="email"
              placeholder="john.doe@mail.com"
            ></input>
            <label>Numéro de rue</label>
            <input
              required
              type="text"
              className="input-profile"
              name="number"
              placeholder="56"
            ></input>
            <label>Voie</label>
            <input
              required
              type="text"
              className="input-profile"
              name="street"
              placeholder="Rue de la Mare"
            ></input>
            <label>Ville</label>
            <input
              required
              type="text"
              className="input-profile"
              name="city"
              placeholder="Paris"
            ></input>
            <label>Code postal</label>
            <input
              required
              type="text"
              className="input-profile"
              name="postal_code"
              placeholder="75001"
            ></input>
            <label>Pays</label>
            <input
              required
              type="text"
              className="input-profile"
              name="country"
              placeholder="France"
            ></input>
            <input
              required
              type="submit"
              value="Utiliser cette adresse"
            ></input>
          </form>
        </div>
      );
    }
  }
}
