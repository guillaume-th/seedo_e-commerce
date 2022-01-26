import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../CartSlice";
import Delete from "../assets/delete.svg";
import "../styles/ArticleDetails.css";
const API_URL = process.env.REACT_APP_API_URL;

export default function ArticleDetail() {
  const [data, setData] = useState(null);
  const [imgFirstLink, setImgFirstLink] = useState(null);
  const { id } = useParams();
  const user_id = localStorage.getItem("user_id");
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const commentForm = useRef();
  const [refresh, setRefresh] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {


    fetch(`${API_URL}/article/${id}`)
      .then((res) => res.json())
      .then((res) => {
        res.data.updatedPrice = res.data.price;
        let str = "";
        res.data.categories.forEach((elt) => {
          str += elt.name[0].toUpperCase() + elt.name.slice(1, elt.name.length) + ", ";
        });
        res.data.categoriesName = str.slice(0, str.length - 2);
        setData(res.data);
        setImgFirstLink(res.data.photos[0].imgLink);
        getColorPrices(res.data.color);
      })
      .catch((err) => console.error(err));
  }, [refresh, id]);

  const addToCart = (e, product) => {
    e.preventDefault();
    let cartTemp = [...cart];
    let obj = { ...product };
    obj.selectedQuantity = Number(document.getElementById(product.id).value);
    obj.price = computePrice(obj);
    for (let i = cart.length - 1; i >= 0; i--) {
      if (cart[i].id === obj.id) {
        obj.selectedQuantity =
          Number(cart[i].selectedQuantity) + Number(obj.selectedQuantity);
        cartTemp.splice(i, 1);
      }
    }
    cartTemp.push(obj);
    dispatch(updateCart(cartTemp));
    sessionStorage.setItem("cart", JSON.stringify(cartTemp));
  };

  const computePrice = (e) => {
    return e.promo > 0 ? (e.updatedPrice - (e.updatedPrice * e.promo) / 100).toFixed(2) : (e.updatedPrice).toFixed(2);
  };

  const switchPhoto = (e) => {
    setImgFirstLink(e.target.src);
  };

  const addcomment = (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm.current);
    formData.append("user_id", user_id);

    fetch(`${API_URL}/article/avis/add/${data.id}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setRefresh(Math.random());
      })
      .catch((err) => console.error(err));
  };

  const delete_comment = (id_comment) => {
    fetch(`${API_URL}/article/avis/remove/${id_comment}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRefresh(Math.random());
      })
      .catch((err) => console.error(err));
  };

  const getColorPrices = (colorToFind) => {
    fetch(`${API_URL}/colors/all`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res);
      })
      .catch((err) => console.error(err));
  };

  const setColor = (color) => {
    const article = { ...data };
    article.updatedPrice = data.price + color.price * data.price / 100;
    article.updatedColor = color.name;
    setData(article);
  }

  if (data) {
    return (
      <div>
        <div key={data.id} id="ficheDetail">
          <div className="article-top">
            <div className="photos" style={{width : "50%"}}>
              <div className="lgPhoto">
                <img alt="main" src={imgFirstLink} className="imgPrincipale"></img>
              </div>
              <div className="smPhotos">
                {data.photos.map((i) => {
                  if (i.imgLink !== imgFirstLink) {
                    return (
                      i && (
                        <div onClick={switchPhoto} className="imgSecondaire">
                          <img
                            alt="secondary"
                            key={i.id}
                            src={i.imgLink}
                            className="imgSecondaire"
                          ></img>
                        </div>
                      )
                    );
                  }
                })}
              </div>
            </div>
            <div style={{width : "50%"}}>
              <h2 className="titleName">{data.name}</h2>
              <p className="categories-detail">{data.categoriesName}</p>
              <p>
                <strong className="green">Couleur : </strong>
                {data.updatedColor ? data.updatedColor : "Non renseignée"}
              </p>
              {colors &&
                <div style={{ display: "flex", gap: ".25rem" }}>
                  {colors.map(e => {
                    return (
                      <div onClick={() => setColor(e)} className="color-choice" style={{ cursor: "pointer", backgroundColor: e.name, height: 50, width: 50 }}></div>
                    )
                  })}
                </div>
              }
              <form onSubmit={(event) => addToCart(event, data)} className="horizontale-flex center-flex marginAuto">
                <input
                  type="number"
                  id={data.id}
                  defaultValue={1}
                  className="number"
                ></input>
                <input type="submit" value="Ajouter au panier" />
              </form>
              <div className="infoDetail">
                <p>
                  <strong className="green">Prix : </strong>
                  {(data.updatedPrice - data.updatedPrice * data.promo / 100).toFixed(2)} €
                </p>
                <p>
                  <strong className="green">Poids : </strong>
                  {data.weight}kg
                </p>
              </div>
            </div>
          </div>
          <div className="article-bottom">
            <p style={{ width: "50%" }}>{data.description}</p>
            <hr></hr>
            <ul style={{ width: "50%" }} id="comments">
              {data.comments.map((i) => {
                return (
                  <li className="comment-body">
                    <p className="comment-name">{i.firstname}{i.lastname}</p>
                    <p className="comment-date">{i.CreationDate.date.slice(0, 10)}</p>
                    <p className="comment-content">{i.content}</p>
                    {user_id == i.user_id &&
                      <img
                        src={Delete}
                        className="comment-icon" onClick={() => { delete_comment(i.id) }}></img>
                    }
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="green" style={{ marginTop: "2rem" }}>
            Laissez un commentaire à propos de l'article !
          </p>
          <form ref={commentForm} onSubmit={addcomment} className="vertical-flex center-flex">
            <textarea
              id="leaveComment"
              className="filter-border"
              rows={10}
              cols={50}
              name="content"
              maxLength={255}
            ></textarea>
            <input type="submit" value="commenter"></input>
          </form>
        </div>
      </div>
    );
  } else {
    return <p>Chargement en cours...</p>;
  }
}
