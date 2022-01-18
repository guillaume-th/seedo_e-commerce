import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../CartSlice";
import Delete from "../assets/delete.svg";
const API_URL = process.env.REACT_APP_API_URL;


export default function ArticleDetail() {
    const [data, setData] = useState(null);
    const [imgFirstLink, setImgFirstLink] = useState(null);
    const { id } = useParams();
    const user_id = localStorage.getItem("user_id");
    const cart = useSelector((state => state.cart.value));
    const dispatch = useDispatch();
    const commentForm = useRef();
    const [refresh, setRefresh] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/article/${id}`)
            .then(res => res.json())
            .then(res => {
                setData(res.data);
                setImgFirstLink(res.data.photos[0].imgLink);
                // console.log(res.data.photos[0].imgLink)
            })
            .catch(err => console.error(err));
    }, [refresh]);

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
    const addcomment = (e) => {
        e.preventDefault();
        const formData = new FormData(commentForm.current);
        formData.append("user_id", user_id)

        fetch(`${API_URL}/article/avis/add/${data.id}`,
            {
                method: "POST",
                body: formData,
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setRefresh(Math.random());
            })
            .catch(err => console.error(err));
    }
    const delete_comment = (id_comment) => {
        fetch(`${API_URL}/article/avis/remove/${id_comment}`)
            .then(res => res.json())
            .then(res => {
                setRefresh(Math.random());
            })
            .catch(err => console.error(err));
    }
    if (data) {
        return (
            <div>
                <div key={data.id} id="ficheDetail">
                    <h2 className="titleName">{data.name}</h2>
                    <p>{data.description}</p>
                    <p><strong className="green">Couleur : </strong>{data.color ? data.color : 'non renseignée'}</p>
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
                                    if (i.imgLink !== imgFirstLink) {
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
                        {
                            data.comments.map(i => {

                                return (
                                    <li>
                                        <p>{i.firstname}{i.lastname}</p>
                                        <p>{i.CreationDate.date}</p>
                                        <p>{i.content}</p>
                                        {user_id == i.user_id &&
                                        <img
                                        src={Delete}
                                        className="icon" onClick={() => { delete_comment(i.id) }}></img>
                                       
                                        }
                                    </li>

                                )
                            })
                        }
                    </ul>
                    <p className="green">Laissez un commentaire à propos de l'article !</p>
                    <form ref={commentForm} onSubmit={addcomment}>
                        <input type="textarea" id="leaveComment" rows='30' cols='30' name="content"></input>
                        <input type="submit" value="commenter"  ></input>
                    </form >
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
