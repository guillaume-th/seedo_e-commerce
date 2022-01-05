import { useRef, useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export default function Profile() {
    const userForm = useRef();
    const [user, setUser] = useState(null);
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        console.log("in", `${API_URL}/user/${user_id}`); 
        fetch(`${API_URL}/user/${user_id}`, 
        {
            method : "GET", 
            "Access-Control-Allow-Origin" : "*",
        })

            .then((res) => res.json())
            .then((res) => setUser(res))
            .catch((err) => console.error(err));
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
    if(user){
        return (
            <div>
                <form ref={userForm} onSubmit={submitUserData}>
                    <input type="text" name="firstname" placeholder="Prénom" defaultValue={user.firstname}></input>
                    <input type="text" name="lastname" placeholder="Nom de famille" defaultValue={user.lastname}></input>
                    <input type="text" name="email" placeholder="Email" defaultValue={user.email}></input>
                    <input type="text" name="telephone" placeholder="Téléphone" defaultValue={user.email}></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    <h3>Coordonnées bancaires</h3>
                    <input type="text" name="number_CB" placeholder="Numéro de carte bancaire"></input>
                    <input type="text" name="cvv" placeholder="CVV"></input>
                    <input type="date" name="expiration_CB" placeholder="Date d'expiration"></input>
                    <input type="submit" value="Sauvegarder les modifications"></input>
                </form>
                <h3>Vos adresses</h3>
                {
                    user.addresses.map((e) => {
                        return (
                            <div>
                                <p>{e.number} {e.street} </p>
                                <p>{e.postal_code}, {e.country}</p>
                                <button>Modify</button>
                                <hr></hr>
                            </div>
                        );
                    })
                }
                {/* <form ref={adressForm}>
                    <input></input>
                </form> */}
            </div>
    
        );
    }
    else{
        return(
            <p>Vous n'êtes pas connecté.</p>
        );
    }


}
