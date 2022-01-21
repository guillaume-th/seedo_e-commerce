import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../CartSlice";
const API_URL = process.env.REACT_APP_API_URL;

export default function ArticleListing() {
    const [data, setData] = useState(null);
    const cart = useSelector((state) => state.cart.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                console.log(res); 
                setData(res);

            })
            .catch(err => console.error(err));
    }, []);


    const addToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation(); 
        console.log(e); 
        let cartTemp = [...cart];
        // let cartTemp = JSON.parse(localStorage.getItem("cart")) || [];
        let obj = { ...product.data };
        obj.selectedQuantity = Number(document.getElementById(product.data.id).value);
        obj.price = computePrice(obj);
        for (let i = cart.length - 1; i >= 0; i--) {
            if (cart[i].id === obj.id) {
                obj.selectedQuantity = Number(cart[i].selectedQuantity) + Number(obj.selectedQuantity);
                cartTemp.splice(i, 1);
            }
        }
        cartTemp.push(obj);
        dispatch(updateCart(cartTemp));
        sessionStorage.setItem("cart", JSON.stringify(cartTemp));
    }

    const computePrice = (e) => {
        return e.promo > 0 ? e.price - (e.price * e.promo / 100).toFixed(2) : e.price.toFixed(2);
    }

    if (data) {
        return (
            <div>
                <div className="gallery">
                    <div id="filtres">
                        ICI LES FILTRES DE RECHERCHE
                    </div>
                    {
                        data.map((e) => {
                            return (

                                <div key={e.data.id} onClick={(ev) => {
                                    if(!ev.target.classList.contains("buttonShop") && !ev.target.classList.contains("number")){
                                        navigate("/article/" + e.data.id)
                                    }}} className="thumbnail">
                                        <div className="img-wrapper">
                                            {e.data.photos[0] &&
                                                <img alt="main" src={e.data.photos[0].imgLink} />
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
                                        <form onSubmit={(event) => addToCart(event, e)}>
                                            <input type="number" id={e.data.id} defaultValue={1} className="number"></input>
                                            <input type="submit" value="Ajouter au panier" className="buttonShop" />
                                        </form>
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
