import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;


export default function MysteryEdit() {
    const editForm = useRef();
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [datauser, setDatauser] = useState(null);
    const admin = useSelector(state => state.admin.value);

    /* eslint-disable */
    useEffect(() => {
        fetch(`${API_URL}/article/${id}`)
            .then((res) => res.json())
            .then((res) => {
                let str = "";
                res.data.categories.forEach((elt) => {
                    str += elt.name + ", ";
                });
                res.data.categoriesName = str.slice(0, str.length - 2);
                setData(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const edit = (e) => {
        e.preventDefault();
        const data = new FormData(editForm.current);
        fetch(`${API_URL}/mystery/mystery_edit/${id}`, {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    };

    const addPhoto = e => {
        e.preventDefault();
        const photos = [];
        for (let elt of document.getElementsByClassName("photo")) {
            photos.push(elt.value);
        }
        fetch(`${API_URL}/article/add-photos/${id}`, {
            method: "POST",
            body: JSON.stringify(photos),
        })
            .then(res => res.json())
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.error(err));

    }

    const addPhotoInput = () => {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "http://url_de_votre_image";
        input.classList.add("photo");
        document.getElementById("photo-inputs").appendChild(input);
    }

    const deletePhoto = (id_photo) => {
        fetch(`${API_URL}/article/remove-photo/${id}/${id_photo}`)
            .then(res => res.json())
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.error(err));
    }
 
    const showuser = (id) => {
        navigate("/mystery/user/" + id);
    }

    if (admin) {
        if (data) {
            return (
                <div className="wrapper">
                    <div className="std-colored-wrapper">
                        <div className="wrapper">
                        <button onClick={() => showuser(id)}>Voir les abonnés</button>                
                            <form encType="multipart/form-data" ref={editForm} onSubmit={edit} className="std-vertical-form  edit-article-form" >
                                <label>Nom de l'article</label>
                                <input name="name" type="text" defaultValue={data.name}></input>
                                <label>Description</label>
                                <textarea name="description">{data.description}</textarea>
                                <label>Poids (kg)</label>
                                <input name="weight" type="text" defaultValue={data.weight}></input>
                                <label>Couleur</label>
                                <input name="color" type="text" defaultValue={data.color}></input>
                                <label>Quantité</label>
                                <input name="quantity" type="number" defaultValue={data.quantity}></input>
                                <label>Promo</label>
                                <input name="promo" type="number" defaultValue={data.promo} minLength={0} maxLength={100}></input>
                                <label>Prix</label>
                                <input type="number" name="price" defaultValue={data.price}></input>
                                <label>Prix de l'abonnement</label>
                                <input type="number" name="subscriptionprice" defaultValue={data.subprice}></input>
                                <label>Catégorie(s)</label>
                                <input name="categories" type="text" placeholder="Catégorie 1, catégorie 2" defaultValue={data.categoriesName} minLength={0} maxLength={100}></input>
                                <input type="submit" value="Sauvegarder les modifications"></input>
                            </form>
                            <h3>Photos</h3>
                            {
                                data.photos.map(e => {
                                    return (
                                        <div>
                                            <img src={e.imgLink} />
                                            <button onClick={() => deletePhoto(e.id)}>Supprimer</button>
                                        </div>
                                    )
                                })
                            }
                            <form id="photo-form" encType="multipart/form-data" onSubmit={addPhoto} className="">
                                <div id="photo-inputs">
                                    <input type="text" name="photo" className="photo" placeholder="http://url_de_votre_image"></input>
                                </div>
                                <button onClick={addPhotoInput}>+</button>
                                <div className="wrapper">
                                    <input className="centered-btn" type="submit" value="Ajouter au produit"></input>
                                </div>
                            </form>
                        </div>
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
    else {
        return (
            <p>Cette page est réservée aux administateurs.</p>
        );
    }
}
