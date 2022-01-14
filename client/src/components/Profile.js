import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"; 
import { updateAdmin} from "../AdminSlice";
const API_URL = process.env.REACT_APP_API_URL;

export default function Profile() {
    const userForm = useRef();
    const newAdressForm = useRef();
    const editAdressForm = useRef();
    const [user, setUser] = useState(null);
    const user_id = localStorage.getItem("user_id");
    const [modalOpen, setModalOpen] = useState(false);
    const [editedAdress, setEditedAdress] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const cart = useSelector(state => state.cart.value); 

    useEffect(() => {
        if (user_id === null) {
            navigate("/auth");
        } else {
            fetch(`${API_URL}/user/${user_id}`)
                .then((res) => res.json())
                .then((res) => setUser(res.data))
                .catch((err) => console.error(err));
        }
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setModalOpen(false);
            }
        });
        /* eslint-disable */
    }, []);

    const submitUserData = (e) => {
        e.preventDefault();
        const data = new FormData(userForm.current);

        fetch(`${API_URL}/user/${user_id}/edit`, {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "ok") {
                    setUser(res.data);
                }
            })
            .catch((error) => console.error(error));
    };

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
                    setUser(res.data);
                }
            })
            .catch((error) => console.error(error));
        for (const elt of document.getElementsByClassName("input-profile")) {
            console.log(elt);
            elt.value = "";
        }
    };

    if (user) {
        return (

            // <div className="e_com-footer">
            <div className="wrapper">
                <h1>PROFILE</h1>
                <div className="profile-section">

                    <form className="profile-form" ref={userForm} onSubmit={submitUserData} encType="multipart/form-data">
                        <div className="user-details">
                            <h3>Coordonnées</h3>
                           <label>Nom: <input type="text" name="firstname" placeholder="Prénom" defaultValue={user.firstname}></input></label>
                            <label>Prenom:<input type="text" name="lastname" placeholder="Nom de famille" defaultValue={user.lastname}></input></label>
                            <label> Email:<input type="text" name="email" placeholder="Email" defaultValue={user.email}></input></label>
                            <label> Telephone: <input type="text" name="telephone" placeholder="Téléphone" defaultValue={user.telephone}></input></label>
                        </div>
                        <div className="bank-details">
                            <h3>Coordonnées bancaires</h3>
                            <label>Numéro CB<input type="text" name="number_CB" placeholder="Numéro de carte bancaire" minLength={16} maxLength={16} defaultValue={user.number_CB}></input></label>
                            <label>CVV<input type="text" name="cvv" placeholder="CVV" minLength={3} maxLength={3} defaultValue={user.cvv}></input></label>
                            <label>Date d'expiration<input type="text" name="expiration_CB" placeholder="Date d'expiration" minLength={5} maxLength={5} defaultValue={user.expiration_CB}></input></label>
                        </div>
                        <input type="submit" value="Sauvegarder les modifications"></input>
                    </form>
                </div>
                <h3>Vos adresses</h3>
                {
                    user.adresses.map((e) => {
                        return (
                            <div key={e.id} className="edit-adress">
                                <p>{e.number} {e.street} </p>
                                <p>{e.city} {e.postal_code}, {e.country}</p>
                                <button onClick={() => {
                                    setEditedAdress(e);
                                    setModalOpen(true);
                                }}>Modifier</button>
                            </div>
                        );
                    })
                }
                {user.adresses.length < 1 &&
                    <p>Pas d'adresse enregistrée</p>
                }
                <div className="adress-section">
                    <form className="" ref={newAdressForm} onSubmit={addAdress} encType="multipart/form-data">
                    <label>Numéro:<input required type="text" className="input-profile" name="number" placeholder="Numéro"></input></label>
                    <label>Rue:<input required type="text" className="input-profile" name="street" placeholder="Rue"></input></label>
                    <label>Ville: <input required type="text" className="input-profile" name="city" placeholder="Ville"></input></label>
                    <label>Code Postal: <input required type="text" className="input-profile" name="postal_code" placeholder="Code Postal"></input></label>
                    <label>Pays:<input required type="text" className="input-profile" name="country" placeholder="Pays"></input></label>
                     <input required type="submit" value="Ajouter cette adresse"></input>
                    </form>
                </div>
                <button onClick={
                    () => {
                        localStorage.clear()
                        dispatch(updateAdmin(false)); 
                        navigate("/");
                    }
                }> Logout</button>
                {modalOpen && (
                    <div id="adress-modal" class="modal">
                        <form
                            className=""
                            ref={editAdressForm}
                            onSubmit={editAdress}
                            encType="multipart/form-data"
                        >
                            <input
                                required
                                type="text"
                                name="number"
                                placeholder="Numéro"
                                defaultValue={editedAdress.number}
                            ></input>
                            <input
                                required
                                type="text"
                                name="street"
                                placeholder="Rue"
                                defaultValue={editedAdress.street}
                            ></input>
                            <input
                                required
                                type="text"
                                name="city"
                                placeholder="Ville"
                                defaultValue={editedAdress.city}
                            ></input>
                            <input
                                required
                                type="text"
                                name="postal_code"
                                placeholder="Code Postal"
                                defaultValue={editedAdress.postal_code}
                            ></input>
                            <input
                                required
                                type="text"
                                name="country"
                                placeholder="Pays"
                                defaultValue={editedAdress.country}
                            ></input>
                            <input required type="submit" value="Sauvegarder"></input>
                            <input type="hidden" name="user_id" value={user_id}></input>
                        </form>
                        <button onClick={() => setModalOpen(false)}>Annuler</button>
                    </div>
                )}

           
            </div>
            // </div>
        );
    } else {
        return <p>Chargement en cours...</p>;
    }
}
