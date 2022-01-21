import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export default function Filter(props) {
    const [categories, setCategories] = useState(null);
    const [newProduct, setNewProduct] = useState(false);
    const [promo, setPromo] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300);

    useEffect(() => {
        transformData();
    }, [currentCategory, newProduct, promo, maxPrice, minPrice]);


    const transformData = () => {
        const result = props.data.filter(filter);
        console.log(result);
        props.onFilter(result);
        return result;
    }

    const filter = (e) => {
        let catBool = false;
        if (currentCategory && e.data.categories) {
            if (currentCategory !== "all") {
                e.data.categories.forEach((elt) => {
                    if (elt.name === currentCategory) {
                        catBool = true;
                    }
                })
            }
            else {
                catBool = true;
            }
        }
        const promoBool = promo ? promo && e.data.promo !== 0 : true;
        const newBool = newProduct ? e.data.new === newProduct : true;
        const minBool = minPrice ? e.data.price >= minPrice : true;
        const maxBool = maxPrice ? e.data.price <= maxPrice : true;

        if (catBool && newBool && promoBool && minBool && maxBool) {
            return true;
        }
        else {
            return false;
        }
    };

    const sortData = (ascendingOrder) => {
        if (ascendingOrder !== "null") {
            let data = transformData();
            if (ascendingOrder === "true") {
                data.sort((a, b) => a.data.price > b.data.price);
            }
            else {
                data.sort((a, b) => b.data.price > a.data.price);
            }
        }
    }

    return (
        <div id="filters">
            <select value={currentCategory} onChange={(e) => { setCurrentCategory(e.target.value) }}>
                <option value="all" selected>Toutes les catégories</option>
                {
                    props.categories.map(e => {
                        return (
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                    })
                }
            </select>
            <label for="new">Nouveautés</label>
            <input type="checkbox" value="on" name="new" checked={newProduct} onChange={() => setNewProduct(!newProduct)}></input>
            <label for="new">Promotions</label>
            <input type="checkbox" value="on" name="promo" checked={promo} onChange={() => setPromo(!promo)}></input>
            <label>Prix compris entre : {minPrice} </label>
            <br></br>
            <input type="range" name="min-price" min="0" max="300" step="10" defaultValue={0} onChange={(e) => setMinPrice(e.target.value)} />
            <label>et : {maxPrice}</label>
            <br></br>
            <input type="range" name="max-price" min="0" max="300" step="10" defaultValue={1000} onChange={(e) => setMaxPrice(e.target.value)} />
            <button>Trier par</button>
            <select onChange={(e) => sortData(e.target.value)}>
                <option value={"null"} selected>Pas de tri</option>
                <option value={true} >Prix croissant</option>
                <option value={false} >Prix décroissant</option>
            </select>
        </div>
    );

}