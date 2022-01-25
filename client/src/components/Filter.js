import { useEffect, useState } from "react";

export default function Filter(props) {
    const [categories, setCategories] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [promo, setPromo] = useState(null);
    const [currentCategory, setCurrentCategory] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300);


    useEffect(() => {   
        setNewProduct(props.new);
        setPromo(props.promo);
        console.log(newProduct, promo, props.new, props.promo); 
        transformData();
    }, [currentCategory, maxPrice, minPrice, props.new, props.promo]);


    const transformData = () => {
        console.log(newProduct, promo);
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

        return (catBool && newBool && promoBool && minBool && maxBool);
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
        <div id="filters" className="vertical-flex center-flex marginAuto width100">
            {newProduct + ""}
            {promo + "\n"}
            {props.new + " " + props.promo}
            <div className="horizontal-flex center-flex wrap">
                <select className="marginAuto" value={currentCategory} onChange={(e) => { setCurrentCategory(e.target.value) }}>
                    <option value="all" selected>Toutes les catégories</option>
                    {
                        props.categories.map(e => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>
                            )
                        })
                    }
                </select>
                <div className="marginAuto horizontal-flex wrap center-flex">
                    <div className="marginAuto">
                        <label for="new">Nouveautés</label>
                        <input type="checkbox" value="on" name="new" checked={newProduct} onChange={() => { setNewProduct(!newProduct, transformData); }}></input>
                    </div>
                    <div className="marginAuto">
                        <label for="new">Promotions</label>
                        <input type="checkbox" value="on" name="promo" checked={promo} onChange={() => { setPromo(!promo, transformData) }}></input>
                    </div>
                </div>
            </div>
            <div className="horizontal-flex center-flex wrap marginAuto width50">
                <label className="marginAuto">Prix minimum : {minPrice}</label>
                <div className="horizontal-flex center-flex marginAuto">
                    <input className="range" type="range" name="min-price" min="0" max="300" step="10" defaultValue={0} onChange={(e) => setMinPrice(e.target.value)} />
                </div>
            </div>
            <div className="horizontal-flex center-flex wrap marginAuto" >
                <label className="marginAuto">Prix maximum : {maxPrice}</label>
                <div className="horizontal-flex center-flex marginAuto">
                    <input className="range" type="range" name="max-price" min="0" max="300" step="10" defaultValue={1000} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
            </div>
            <div className="horizontal-flex center-flex range" >
                <label>Trier par</label>
                <select onChange={(e) => sortData(e.target.value)}>
                    <option value={"null"} selected>Pas de tr   i</option>
                    <option value={true} >Prix croissant</option>
                    <option value={false} >Prix décroissant</option>
                </select>
            </div>
        </div>
    );

}