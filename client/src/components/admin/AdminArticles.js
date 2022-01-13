import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../CartSlice";
const API_URL = process.env.REACT_APP_API_URL;

export default function ArticleListing() {
    const [data, setData] = useState(null);
    const cart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useRef();
    const admin = localStorage.getItem("admin");
    const [refresh, setRefresh] = useState(null);

    useEffect(() => {

        fetch(`${API_URL}/article/all`)
            .then(res => res.json())
            .then(res => {
                res.forEach((e) => {
                    let str = "";
                    e.data.categories.forEach((elt) => {
                        str += elt.name + ", ";
                    });
                    e.data.categoriesName = str.slice(0, str.length - 2);
                });
                setData(res);

            })
            .catch(err => console.error(err));
    }, [refresh]);

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
            .then(res => {
                res.forEach((e) => {
                    let str = "";
                    e.data.categories.forEach((elt) => {
                        str += elt.name + ", ";
                    });
                    e.data.categoriesName = str.slice(0, str.length - 2);
                });
                setData(res);
            })
            .catch(err => console.error(err));

    };

    const deleteArticle = (id) => {
        fetch(`${API_URL}/article/delete/${id}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "ok") {
                    setRefresh(Math.random());
                }
            })
            .catch((err) => console.error(err));
    }


    if (data) {
        return (
            <div className="add_article">
                <div className="wrapper">
                    <div >
                        <form encType="multipart/form-data" className="vertical-form" style={{ width: "50%", marginTop: "5rem" }} ref={form} onSubmit={add}>
                            <div style={{ display: "flex" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label style={{ width: "300px" }}>Nom de l'article</label>
                                    <input style={{ color: "rgb(13,70,13)", width: "500px" }} name="name" type="text"></input>
                                    <label>Catégorie(s)</label>
                                    <input style={{ color: "rgb(13,70,13)" }} name="categories" type="text" placeholder="Catégorie 1, catégorie 2" minLength={0} maxLength={100}></input>
                                    <label>Description</label>
                                    <textarea style={{ color: "rgb(13,70,13)" }} name="description"></textarea>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <label>Poids</label>
                                            <input style={{ color: "rgb(13,70,13)" }} name="weight" type="text" ></input>
                                        </div>
                                        <div>
                                            <label>Couleur</label>
                                            <input style={{ color: "rgb(13,70,13)" }} name="color" type="text"></input>
                                        </div>
                                    </div>
                                    <label>Photo(s)</label>
                                    <input style={{ color: "rgb(13,70,13)" }} name="photo" type="text" placeholder="http://url_de_votre_image" defaultValue={""}></input>
                                    <div style={{ display: "flex", width: "500px" }}>
                                        <div>
                                            <label>Quantité</label>
                                            <input style={{ color: "rgb(13,70,13)", width: "200px" }} name="quantity" type="number"></input>
                                        </div>
                                        <div>
                                            <label>Prix</label>
                                            <input style={{ color: "rgb(13,70,13)", width: "150px" }} type="number" name="price" ></input>
                                        </div>
                                        <div>
                                            <label>Promo</label>
                                            <input style={{ color: "rgb(13,70,13)" }} name="promo" type="number" min={0} max={100}></input>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <input style={{ borderRadius: "20px", color: "white", background: "rgb(13, 70, 13)" }} type="submit" value="Ajouter cet article"></input>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {
                        data.map((e) => {
                            return (
                                <div key={e.data.id}>
                                    <h3>{e.data.name}</h3>
                                    <p>{e.data.price} €</p>
                                    <p>{e.data.categoriesName}</p>
                                    {e.data.photos[0] &&
                                        <img src={e.data.photos[0].imgLink}></img>

                                    }
                                    <div>
                                        <button onClick={() => editArticle(e.data.id)}>Edit</button>
                                        <button onClick={() => deleteArticle(e.data.id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
    else {
        return (
            <p>Chargement en cours...</p>
        );
    }
}
