import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

export default function ArticleEdit() {
  const editForm = useRef();
  const { id } = useParams();
  const [data, setData] = useState(null);
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
    fetch(`${API_URL}/article/${id}/edit`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  if (localStorage.getItem("admin") === "true") {
    if (data) {
      return (
        <form encType="multipart/form-data" ref={editForm} onSubmit={edit}>
          <label>Nom de l'article</label>
          <input name="name" type="text" defaultValue={data.name}></input>
          <label>Description</label>
          <textarea name="description">{data.description}</textarea>
          <label>Poids</label>
          <input name="weight" type="text" defaultValue={data.weight}></input>
          <label>Couleur</label>
          <input name="color" type="text" defaultValue={data.color}></input>
          <label>Quantité</label>
          <input
            name="quantity"
            type="number"
            defaultValue={data.quantity}
          ></input>
          <label>Promo</label>
          <input
            name="promo"
            type="number"
            defaultValue={data.promo}
            minLength={0}
            maxLength={100}
          ></input>
          <label>Price</label>
          <input type="number" name="price" defaultValue={data.price}></input>
          <label>Catégorie(s)</label>
          <input
            name="categories"
            type="text"
            placeholder="Catégorie 1, catégorie 2"
            defaultValue={data.categoriesName}
            minLength={0}
            maxLength={100}
          ></input>
          <input type="submit" value="Sauvegarder les modifications"></input>
        </form>
      );
    } else {
      return <p>Chargement en cours...</p>;
    }
  } else {
    return <p>Cette page est réservée aux administateurs.</p>;
  }
}
