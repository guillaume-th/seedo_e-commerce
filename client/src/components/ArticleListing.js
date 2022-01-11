import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../CartSlice";
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

    const addToCart = (e, product) => {
        e.preventDefault();
        let cartTemp = [...cart];
        // let cartTemp = JSON.parse(localStorage.getItem("cart")) || [];
        let obj = { ...product.data };
        obj.selectedQuantity = Number(document.getElementById(product.data.id).value);

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

    if (data) {
        return (
            <div>
                {
                    data.map((e) => {
                        return (
                            <div key={e.data.id}>
                                <h3>{e.data.name}</h3>
                                <p>{e.data.price} €</p>
                                <p>{e.data.categoriesName}</p>
                                {e.data.photos[0] &&
                                    <img src={e.data.photos[0].imgLink}/>
                                }
                                <form onSubmit={(event) => addToCart(event, e)}>
                                    <input type="number" id={e.data.id} defaultValue={1}></input>
                                    <input type="submit" value="Add to Cart" />
                                </form>
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
