import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/OrderConfirm.css";
import { reduce } from "../utils";
import Payment from "./Payment";
const API_URL = process.env.REACT_APP_API_URL;
const BING_API_KEY = process.env.REACT_APP_BING_API_KEY;

export default function OrderConfirm(state) {
  const [userData, setUserData] = useState(null);
  const [user_id, setUserId] = useState(localStorage.getItem("user_id"));
  const navigate = useNavigate();
  const [selectedAdress, setSelectedAdress] = useState(null);
  const newAdressForm = useRef();
  const guestAdressForm = useRef();
  const cart = useSelector((state) => state.cart.value);
  const fidel = useSelector((state) => state.fidel.value);
  const [error, setError] = useState(null);
  const [shipping, setShipping] = useState(null);
  const weightShipping = useLocation().state.shippingWeight;
  const priceBy100Km = useLocation().state.distance;

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
      getShippingDistance();
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

  const getShippingDistance = () => {
    //console.log("in");
    const origins = "48.864716,2.349014";
    fetch(
      `http://dev.virtualearth.net/REST/v1/Locations?locality=${selectedAdress.city}&postalCode={${selectedAdress.postal_code}}&includeNeighborhood=0&maxResults=1&key=${BING_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        var destinations = `${res?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates[0]},${res?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates[1]}`;
        fetch(
          `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origins}&destinations=${destinations}&travelMode=driving&key=${BING_API_KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            const distance =
              res?.resourceSets[0]?.resources[0]?.results[0]?.travelDistance;
            getShippingFees(distance);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const getShippingFees = (distance) => {
    setShipping(
      Number(
        (
          (distance / 100) * Number(priceBy100Km) +
          Number(weightShipping)
        ).toFixed(2)
      )
    );
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
                {fidel ? reduce(cart) * 0.9 : reduce(cart)}
              </p>
              <p>Frais de livraison: {shipping}</p>
              <p>
                Prix total :
                {fidel
                  ? (
                      parseFloat(reduce(cart)) * 0.9 +
                      parseFloat(shipping)
                    ).toFixed(2)
                  : parseFloat(reduce(cart)) + parseFloat(shipping)}
              </p>
            </div>
            <Payment
              total={
                fidel
                  ? (
                      parseFloat(reduce(cart)) * 0.9 +
                      parseFloat(shipping)
                    ).toFixed(2)
                  : parseFloat(reduce(cart)) + parseFloat(shipping)
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
