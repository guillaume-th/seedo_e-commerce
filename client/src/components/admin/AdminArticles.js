import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

export default function ArticleListing() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const form = useRef();
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
    const computePrice = (e) => {
        return Math.round(parseFloat(e.promo > 0 ? e.price - (e.price * e.promo / 100) : e.price), 2);
    }

    if (data) {
        return (
            <div className="add_article">
                <div className="wrapper">
                    <form encType="multipart/form-data" className="vertical-form" style={{ width: "50%", marginTop: "5rem" }} ref={form} onSubmit={add}>
                        <div style={{ display: "flex" }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label style={{ width: "300px" }}>Nom de l'article :</label>
                                <input style={{ width: "600px" }} name="name" type="text" required></input>
                                <label>Catégorie(s) :</label>
                                <input name="categories" type="text" placeholder="Catégorie 1, catégorie 2" minLength={0} maxLength={100}></input>
                                <label>Description :</label>
                                <textarea name="description" required></textarea>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex" }}>
                                    <div>
                                        <label style={{ marginLeft: "20px" }}>Poids :</label>
                                        <input style={{ width: "270px" }} name="weight" required type="text" ></input>
                                    </div>
                                    <div>
                                        <label style={{ marginLeft: "20px" }}>Couleur :</label>
                                        <input style={{ width: "270px" }} name="color" type="text" required></input>
                                    </div>
                                </div>



                                <div>
                                    <label>Photo(s) :</label>
                                    <input style={{ width: "600px" }} name="photo" type="text" placeholder="http://url_de_votre_image" defaultValue={""}></input>

                                </div>

                                <div style={{ display: "flex", width: "600px", marginLeft: "2%", marginTop: "10px" }}>
                                    <div>
                                        <label>Quantité :</label>
                                        <input required style={{ borderRadius: "20px", height: "30px", width: "189px", border: "none", marginTop: "15px", marginRight: "15px" }} name="quantity" type="number"></input>
                                    </div>
                                    <div>
                                        <label style={{ marginLeft: "6%" }}>Price :</label>
                                        <input required style={{ borderRadius: "20px", height: "30px", width: "189px", border: "none", marginTop: "15px", marginLeft: "10px" }} type="number" name="price" ></input>
                                    </div>
                                    <div>
                                        <label style={{ marginLeft: "12%" }}>Promo :</label>
                                        <input  required style={{ borderRadius: "20px", height: "30px", width: "189px", border: "none", marginTop: "15px", marginLeft: "25px" }} name="promo" type="number" min={0} max={100}></input>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <input style={{ borderRadius: "20px", marginLeft: "60%", fontSize: "25px", marginTop: "5%", padding: "10px 10px" }} type="submit" value="Ajouter cet article"></input>
                        </div>
                    </form>
                </div>
                <div className="gallery">
                    {
                        data.map((e) => {
                            return (
                                <div key={e.data.id} className="thumbnail">
                                    <div className="img-wrapper">
                                        {
                                            e.data.photos[0] &&
                                            <img alt="photo-article" src={e.data.photos[0].imgLink}></img>
                                        }
                                    </div>
                                    {e.data.new &&
                                        <span className="new">Nouveauté !</span>
                                    }
                                    {e.data.promo > 0
                                        ? <><span className="promo"> -{e.data.promo}%</span>
                                            <p className="firstPrice"><strike>{e.data.price} €</strike></p></>

                                        : <div className="noPromo"></div>
                                    }
                                    <div className="infos">
                                        <div className="sub-info">
                                            <p className="name">{e.data.name}</p>
                                            {e.data.promo > 0
                                                ? <div className="prices">
                                                    <p>{computePrice(e.data)} €</p>
                                                </div>
                                                : <p>{e.data.price} €</p>
                                            }
                                            </div>
                                            <p className="cat">{e.data.categoriesName}</p>
                                            {/* {e.data.quantity > 0
                                                ? <p>Etat du stock : {e.data.quantity}.</p>
                                                : <p>En rupture de stock</p>
                                            } */}
                                            < div >
                                                <button onClick={() => editArticle(e.data.id)}>Edit</button>
                                                <button onClick={() => deleteArticle(e.data.id)}>Delete</button>
                                            </div>
                                    </div>
                                </div >
                            )
                        })
                    }
                </div>
            </div >
        );
    }
    else {
        return (
            <p>Chargement en cours...</p>
        );
    }
}
