import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../CartSlice";
const API_URL = process.env.REACT_APP_API_URL;


export default function ArticleDetail() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const cart = useSelector((state => state.cart.value));
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${API_URL}/article/${id}`)
            .then(res => res.json())
            .then(res => {
                setData(res.data);
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

    if (data) {
        return (
            <div>
                <div key={data.id} id="ficheDetail">
                    <h2 className="titleName">{data.name}</h2>
                    <form onSubmit={(event) => addToCart(event, data)}>
                        <input type="number" id={data.id} defaultValue={1}></input>
                        <input type="submit" value="Ajouter au panier" />
                    </form>
                    <p>{data.categoriesName}</p>
                    <p>photo : </p>
                    <ul className="photos">
                        {
                            data.photos.map(i => {
                                console.log(i.id);
                                if(i.id == 1){
                                    return (
                                        i &&
                                        <img key={i.id} src={i.imgLink} className="imgPrincipal"></img>
                                    )
                                }else{
                                    return (
                                        i &&
                                        <img key={i.id} src={i.imgLink} className="imgSecondaire"></img>
                                    )
                                }
                                
                            })
                        }
                    </ul>
                    <p>{data.description}</p>
                    <p>Prix {data.price} €</p>
                    <p>Poids : {data.weight}</p>
                    <p>Couleur : {data.color}</p>
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
