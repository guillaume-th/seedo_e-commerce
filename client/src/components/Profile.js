import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

    useEffect(() => {
        if (user_id === null) {
            navigate("/auth");
        } else {
            fetch(`${API_URL}/user/${user_id}`)
                .then((res) => res.json())
                .then((res) => setUser(res.data))
                .catch((err) => console.error(err));
        }
        window.addEventListener("keydown", (e)=>{
            if(e.key === "Escape"){
                setModalOpen(false); 
            }
        });
    }, []);

    const submitUserData = (e) => {
        e.preventDefault();
        const data = new FormData(userForm.current);

        fetch(`${API_URL}/user/${user_id}/edit`,
            {
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
    }

    const addAdress = (e) => {
        e.preventDefault();
        const data = new FormData(newAdressForm.current);
        fetch(`${API_URL}/user/${user_id}/adress`,
            {
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
    }

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
                    setUser(res.data);
                }
            })
            .catch((error) => console.error(error));

    }

    if (user) {
        return (

            // <div className="e_com-footer">
            <div className="wrapper">
                <h1>PROFILE</h1>
                        <div className="profile-section">
                            
                <form className="vertical-form" ref={userForm} onSubmit={submitUserData} encType="multipart/form-data">
                  <div className="user-details">
                  <h3>Coordonnées</h3>
                  <input type="text" name="firstname" placeholder="Prénom" defaultValue={user.firstname}></input>
                    <input type="text" name="lastname" placeholder="Nom de famille" defaultValue={user.lastname}></input>
                    <input type="text" name="email" placeholder="Email" defaultValue={user.email}></input>
                    <input type="text" name="telephone" placeholder="Téléphone" defaultValue={user.telephone}></input>
                  </div>
                    <div className="bank-details">
                    <h3>Coordonnées bancaires</h3>
                    <input type="text" name="number_CB" placeholder="Numéro de carte bancaire" minLength={16} maxLength={16} defaultValue={user.number_CB}></input>
                    <input type="text" name="cvv" placeholder="CVV" minLength={3} maxLength={3} defaultValue={user.cvv}></input>
                    <input type="text" name="expiration_CB" placeholder="Date d'expiration" minLength={5} maxLength={5} defaultValue={user.expiration_CB}></input>
                    </div>
                    <input type="submit" value="Sauvegarder les modifications"></input>
                </form>
                        </div>
                <h3>Vos adresses</h3>
                {
                    user.adresses.map((e) => {
                        return (
                            <div key={e.id}>
                                <p>{e.number} {e.street} </p>
                                <p>{e.city} {e.postal_code}, {e.country}</p>
                                <button onClick={() => {
                                    setEditedAdress(e);
                                    setModalOpen(true);
                                }}>Modifier</button>
                                <hr></hr>
                            </div>
                        );
                    })
                }
                {user.adresses.length < 1 &&
                    <p>Pas d'adresse enregistrée</p>
                }
                <form className="vertical-form" ref={newAdressForm} onSubmit={addAdress} encType="multipart/form-data">
                    <input required type="text" className="input-profile" name="number" placeholder="Numéro"></input>
                    <input required type="text" className="input-profile" name="street" placeholder="Rue"></input>
                    <input required type="text" className="input-profile" name="city" placeholder="Ville"></input>
                    <input required type="text" className="input-profile" name="postal_code" placeholder="Code Postal"></input>
                    <input required type="text" className="input-profile" name="country" placeholder="Pays"></input>
                    <input required type="submit" value="Ajouter cette adresse"></input>
                </form>
                <button onClick={
                    () => {
                        localStorage.clear()
                        navigate("/");
                    }
                }> Logout</button>

                {modalOpen && 
                    <div id="adress-modal" class="modal">
                        <form className="vertical-form" ref={editAdressForm} onSubmit={editAdress} encType="multipart/form-data">
                            <input required type="text" name="number" placeholder="Numéro" defaultValue={editedAdress.number}></input>
                            <input required type="text" name="street" placeholder="Rue" defaultValue={editedAdress.street}></input>
                            <input required type="text" name="city" placeholder="Ville" defaultValue={editedAdress.city}></input>
                            <input required type="text" name="postal_code" placeholder="Code Postal" defaultValue={editedAdress.postal_code}></input>
                            <input required type="text" name="country" placeholder="Pays" defaultValue={editedAdress.country}></input>
                            <input required type="submit" value="Sauvegarder"></input>
                            <input type="hidden" name="user_id" value={user_id}></input>
                        </form>
                        <button onClick={() => setModalOpen(false)}>Annuler</button>
                    </div>
                }

                <div className="ocean">
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>
            </div>
            // </div>
        );
    }
    else {
        return (
            <p>Chargement en cours...</p>
        );
    }


}
