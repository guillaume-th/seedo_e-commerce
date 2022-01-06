import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;


export default function ArticleListing() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const form = useRef();
    const admin = localStorage.getItem("admin");

    useEffect(() => {
        fetch(`${API_URL}/article/all`)
            .then(res => res.json())
            .then(res => {setData(res); console.log(res)})
            .catch(err => console.error(err));
    }, []);

    const editArticle = (id) => {
        navigate("/article/edit/" + id);
    }

    const add = (e) => {
        e.preventDefault();
        const data = new FormData(form.current);
        fetch(`${API_URL}/article/new`, {
            method: "POST",
            body: data,
        })
            .then(res => res.json())
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }

    if (data) {
        return (
            <div>
                <form encType="multipart/form-data" ref={form} onSubmit={add}>
                    <label>Nom de l'article</label>
                    <input name="name" type="text"></input>
                    <label>Description</label>
                    <textarea name="description"></textarea>
                    <label>Poids</label>
                    <input name="weight" type="text" ></input>
                    <label>Couleur</label>
                    <input name="color" type="text"></input>
                    <label>Quantité</label>
                    <input name="quantity" type="number"></input>
                    <label>Price</label>
                    <input type="number" name="price" defaultValue={data.quantity}></input>
                    <label>Promo</label>
                    <input name="promo" type="number" minLength={0} maxLength={100}></input>
                    <label>Catégorie(s)</label>
                    <input name="categories" type="text" placeholder="Catégorie 1, catégorie 2" minLength={0} maxLength={100}></input>
                    <input type="submit" value="Sauvegarder les modifications"></input>
                </form>
                {
                    data.map((e) => {
                        return (
                            <div key={e.data.id}>
                                <h3>{e.data.name}</h3>
                                <p>{e.data.price} €</p>
                                {admin === "true" &&
                                    <button onClick={() => editArticle(e.data.id)}>Edit</button>
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }
    else {
        return (
            <p>Chargement en cours...</p>
        );
    }
}
