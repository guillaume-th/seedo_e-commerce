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
    }

    const filter = (e) => {
        let catBool = false;
        if (currentCategory && e.data.categories) {
            if (currentCategory !== "all") {
                e.data.categories.forEach((elt) => {
                    console.log(elt);
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

    return (
        <div id="filters" className="vertical-flex center-flex">
            <div className="horizontal-flex center-flex">
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
            </div>
            <div className="horizontal-flex center-flex range">
                <label>Prix compris entre : {minPrice} </label>
                <input className="range" type="range" name="min-price" min="0" max="300" step="10" defaultValue={0} onChange={(e)=>setMinPrice(e.target.value)}/>
            </div>
            <div className="horizontal-flex center-flex range" id="bottomRange">
                <label>et : {maxPrice}</label>
                <input className="range" type="range" name="max-price" min="0" max="300" step="10" defaultValue={1000}onChange={(e)=>setMaxPrice(e.target.value)}/>
            </div>
        </div>
    );

}