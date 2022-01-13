import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../CartSlice";
const API_URL = process.env.REACT_APP_API_URL;


export default function ArticleDetail() {
    const [data, setData] = useState(null);
    const [imgFirstLink, setImgFirstLink] = useState(null);
    const { id } = useParams();
    const cart = useSelector((state => state.cart.value));
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${API_URL}/article/${id}`)
            .then(res => res.json())
            .then(res => {
                setData(res.data);
                setImgFirstLink(res.data.photos[0].imgLink);
                // console.log(res.data.photos[0].imgLink)
            })
            .catch(err => console.error(err));
    }, []);

    const addToCart = (e, product) => {
        e.preventDefault();
        let cartTemp = [...cart];
        // let cartTemp = JSON.parse(localStorage.getItem("cart")) || [];
        let obj = { ...product };
        obj.selectedQuantity = Number(document.getElementById(product.id).value);
        obj.price = computePrice(obj);
        for (let i = cart.length - 1; i >= 0; i--) {
            if (cart[i].id === obj.id) {
                obj.selectedQuantity = Number(cart[i].selectedQuantity) + Number(obj.selectedQuantity);
                cartTemp.splice(i, 1);
            }
        }
        cartTemp.push(obj);
        dispatch(updateCart(cartTemp));
        localStorage.setItem("cart", JSON.stringify(cartTemp));
    }

    const computePrice = (e) => {
        console.log(e);
        return Math.round(parseFloat(e.promo > 0 ? e.price - (e.price * e.promo / 100) : e.price), 2);
    }

    const switchPhoto = (e) => {
        setImgFirstLink(e.target.src);
    }


    if (data) {
    // console.log(data.photos[0].imgLink);
        return (
            <div>
                <div key={data.id} id="ficheDetail">
                    <h2 className="titleName">{data.name}</h2>
                    <p>{data.description}</p>
                    <p><strong className="green">Couleur : </strong>{data.color ? data.color : 'non renseignée' }</p>
                    <div className="infoDetail">
                        <p><strong className="green">Prix : </strong>{data.price} €</p>
                        <p><strong className="green">Poids : </strong>{data.weight}g</p>
                    </div>
                    <form onSubmit={(event) => addToCart(event, data)}>
                        <input type="number" id={data.id} defaultValue={1} className="number"></input>
                        <input type="submit" value="Ajouter au panier" />
                    </form>
                    <p>{data.categoriesName}</p>
                    <div className="photos">
                        <div className="lgPhoto">
                            <img src={imgFirstLink} className="imgPrincipale"></img>
                        </div>
                        <div className="smPhotos">
                        {
                            data.photos.map(i => {
                                if(i.imgLink !== imgFirstLink){
                                    return (
                                        i &&
                                        <div onClick={switchPhoto} className="imgSecondaire"><img key={i.id} src={i.imgLink} className="imgSecondaire"></img></div>
                                    )
                                }
                            })
                        }
                        </div>
                    </div>
                    <ul id="comments">
                        <li>Ceci est un commentaire</li>
                        <li>Ceci est un commentaire</li>
                        <li>Ceci est un commentaire</li>
                        <li>Ceci est un commentaire</li>
                        <li>Ceci est un commentaire</li>
                        <li>Ceci est un commentaire</li>
                    </ul>
                    <p className="green">Laissez un commentaire à propos de l'article !</p>
                    <input type="textarea" id="leaveComment" rows='30' cols='30' ></input>
                    <input type="submit" value="commenter"></input>
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
