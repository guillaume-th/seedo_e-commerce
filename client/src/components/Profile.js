import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { updateAdmin } from "../AdminSlice";
import Delete from "../assets/delete.svg";
const API_URL = process.env.REACT_APP_API_URL;

export default function Profile() {
    const userForm = useRef();
    const newAdressForm = useRef();
    const editAdressForm = useRef();
    const [user, setUser] = useState(null);
    const [refresh, setRefresh] = useState(null);
    const user_id = localStorage.getItem("user_id");
    const [modalOpen, setModalOpen] = useState(false);
    const [editedAdress, setEditedAdress] = useState(false);
    const navigate = useNavigate();

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
    }, [refresh]);

    const submitUserData = (e) => {
        e.preventDefault();
        const data = new FormData(userForm.current);
        // console.log(userForm.current);
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

    const editAdress = (e) => {
        e.preventDefault();
        const data = new FormData(editAdressForm.current);

        setModalOpen(false);
        fetch(`${API_URL}/user/adress/${editedAdress.id}/edit`,
            {
                method: "POST",
                body: data,
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "ok") {
                }
            })
            .catch((error) => console.error(error));

    }
    const delete_adress = (id) => {

        fetch(`${API_URL}/user/adress/${id}/remove`,
            {
                method: "POST",
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "ok") {
                    setRefresh(Math.random());
                }
            })
            .catch((error) => console.error(error));
    }
    
    //console.log(user);
    if (user) {
        return (

            // <div className="e_com-footer">
            <div className="wrapper">
                <h1>PROFILE</h1>
                {/* <button onClick={(ev) => {navigate("/Profile/"+ user_id)}}> commande </button> */}
                <form ref={userForm} onSubmit={submitUserData} encType="multipart/form-data">
                    <div className="profile-section">
                        <div className="user-details profile-form">
                            <h3>Coordonnées</h3>
                            <label className="std-input-label">Nom: </label>
                            <input className="std-input-label" type="text" name="firstname" placeholder="Prénom" defaultValue={user.firstname}></input>
                            <label className="std-input-label">Prenom:</label>
                            <input className="std-input-label" type="text" name="lastname" placeholder="Nom de famille" defaultValue={user.lastname}></input>
                            <label className="std-input-label"> Email:</label>
                            <input className="std-input-label" type="text" name="email" placeholder="Email" defaultValue={user.email}></input>
                            <label className="std-input-label"> Telephone:</label>
                            <input className="std-input-label" type="text" name="telephone" placeholder="Téléphone" defaultValue={user.telephone}></input>
                            { user.fidel ? 
                                <div className="fidelite">
                                    <p className="lg-char green bold">Vous êtes un client fidèle !</p>
                                    <p className="sm-char">(gratuite, remise de 10% sur chaque produits)</p>
                                    <label className="sm-char">Arrêter ma carte de fidélité</label>
                                    <input type="checkbox" name="fidel" value={false}></input>
                                </div>
                                :
                                <div className="fidelite">
                                    <p className="lg-char">Adhérez à notre programme de fidélité gratuit ! 10% de remise sur chaque produit !</p>
                                    <p className="sm-char">(Cumulable avec une autre pomotion déjà présente sur le produit)</p>
                                    <label className="lg-char">M'inscrire au programme de fidélité</label>
                                    <input type="checkbox" name="fidel" defaultValue={true}></input>
                                </div>
                            }
                        </div>
                        <div className="bank-details profile-form">
                            <h3>Coordonnées bancaires</h3>
                            <label className="std-input-label">Numéro CB</label>
                            <input className="std-input-label" type="text" name="number_CB" placeholder="Numéro de carte bancaire" minLength={16} maxLength={16} defaultValue={user.number_CB}></input>
                            <label className="std-input-label">CVV</label>
                            <input className="std-input-label" type="text" name="cvv" placeholder="CVV" minLength={3} maxLength={3} defaultValue={user.cvv}></input>
                            <label className="std-input-label">Date d'expiration</label>
                            <input className="std-input-label" type="text" name="expiration_CB" placeholder="Date d'expiration" minLength={5} maxLength={5} defaultValue={user.expiration_CB}></input>
                        </div>
                    </div>
                    <div className="wrapper">
                        <input type="submit" className="centered-btn" value="Sauvegarder les modifications"></input>
                    </div>
                </form>
                <div className="wrapper adress-wrapper">
                    <h3>Vos adresses</h3>
                    {
                        user.adresses.map((e) => {
                            return (
                                <div key={e.id} className="edit-adress">
                                    <p>{e.number} {e.street} </p>
                                    <p>{e.city} {e.postal_code}, {e.country}</p>
                                    <img
                                        src={Delete}
                                        className="comment-icon" onClick={() => { delete_adress(e.id) }}></img>
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
                </div>

                <div className="adress-section">
                    <h3>Nouvelle adresse</h3>
                    <form className="adress-form" ref={newAdressForm} onSubmit={addAdress} encType="multipart/form-data">
                        <label className="std-input-label">Numéro:</label>
                        <input required type="text" className="std-input-label" name="number" placeholder="Numéro"></input>
                        <label className="std-input-label">Rue:</label>
                        <input required type="text" className="std-input-label" name="street" placeholder="Rue"></input>
                        <label className="std-input-label">Ville: </label>
                        <input required type="text" className="std-input-label" name="city" placeholder="Ville"></input>
                        <label className="std-input-label">Code Postal: </label>
                        <input required type="text" className="std-input-label" name="postal_code" placeholder="Code Postal"></input>
                        <label className="std-input-label">Pays:</label>
                        <input required type="text" className="std-input-label" name="country" placeholder="Pays"></input>
                        <div className="wrapper">
                            <input required type="submit" value="Ajouter cette adresse"></input>
                        </div>
                    </form>
                </div>
                {/* <button onClick={
                    () => {
                        localStorage.clear()
                        dispatch(updateAdmin(false));
                        navigate("/");
                    }
                }> Logout</button> */}
                {modalOpen && (
                    
                    <div id="adress-modal " class="modal wrapper" style={{color:"white"}}>
                        <h2>ADRESSE</h2>
                        <form
                            className="edit-adresse-form"
                            ref={editAdressForm}
                            onSubmit={editAdress}
                            encType="multipart/form-data"
                        >
                            <label htmlFor="number">Numéro :</label>
                            <input
                                className="std-input-label"
                                required
                                type="text"
                                name="number"
                                placeholder="Numéro"
                                defaultValue={editedAdress.number}
                            ></input>
                            <label htmlFor="street">Rue :</label>
                            <input
                                className="std-input-label"
                                required
                                type="text"
                                name="street"
                                placeholder="Rue"
                                defaultValue={editedAdress.street}
                            ></input>
                            <label htmlFor="city">Ville :</label>
                            <input
                                className="std-input-label"
                                required
                                type="text"
                                name="city"
                                placeholder="Ville"
                                defaultValue={editedAdress.city}
                            ></input>
                            <label htmlFor="postal_code">Code postal :</label>
                            <input
                                className="std-input-label"
                                required
                                type="text"
                                name="postal_code"
                                placeholder="Code Postal"
                                defaultValue={editedAdress.postal_code}
                            ></input>
                            <label htmlFor="country">Pays :</label>
                            <input
                                className="std-input-label"
                                required
                                type="text"
                                name="country"
                                placeholder="Pays"
                                defaultValue={editedAdress.country}
                            ></input>
                            <div className="wrapper">
                                
                                <input className="centered-btn hover_save" required type="submit" style={{height:"2.3rem", borderRadius:"2rem", padding:"10px 30px 20px", marginTop:"20px"}} value="Sauvegarder"></input>
                                <button className="hover_annuler" style={{height:"2.3rem", borderRadius:"2rem", padding:"10px 20px 20px"}} onClick={() => setModalOpen(false)}>Annuler</button>
                            </div>
                            <input type="hidden" name="user_id" value={user_id}></input>
                        </form>
                        
                    </div>
                )}


            </div>
        );
    } else {
        return <p>Chargement en cours...</p>;
    }
}
