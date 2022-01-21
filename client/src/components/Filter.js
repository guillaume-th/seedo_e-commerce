import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export default function Filter(props) {
    const [categories, setCategories] = useState(null);
    const [newProduct, setNewProduct] = useState(false);
    const [promo, setPromo] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("all");

    useEffect(() => {
        transformData();
    }, [currentCategory, newProduct, promo]);


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

        console.log(promoBool, newBool)
        if (catBool && newBool && promoBool) {
            return true;
        }
        else {
            return false;
        }
    };

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
        </div>
    );

}