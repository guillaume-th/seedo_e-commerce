import { useEffect, useState } from "react";

export default function Filter(props) {
    const [categories, setCategories] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [promo, setPromo] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300);

    useEffect(() => {
        const select = document.getElementById("cat-select");
        console.log(props)
        if (props.graines) {
            select.value = "graines";
        }
        else if (props.accessoires) {
            select.value = "accessoires";
        }
        else {
            select.value = "all";
        }
        Array.from(select.options).forEach((elt, i) => {
            console.log(elt.value, select.value);
            if (elt.value === select.value)
                select.selectedIndex = i;
        });
        transformData();
    }, [currentCategory, maxPrice, minPrice, newProduct, promo, props.new, props.promo, props.data, props.graines, props.accessoires]);


    const transformData = () => {
        const result = props.data.filter(filter);
        console.log(result);
        props.onFilter(result);
        return result;
    }

    const filter = (e) => {
        let catBool = false;
        let cat;
        if (currentCategory === null) {
            if (props.graines) cat = "graines";
            if (props.accessoires) cat = "accessoires";
        }
        else {
            cat = currentCategory;
        }
        if (cat && e.data.categories) {
            if (cat !== "all") {
                e.data.categories.forEach((elt) => {
                    if (elt.name === cat) {
                        catBool = true;
                    }
                })
            }
            else {
                catBool = true;
            }
        }
        else {
            catBool = true;
        }
        const tmpPromo = promo === null ? props.promo : promo;
        const tmpNew = newProduct === null ? props.new : newProduct;
        const promoBool = tmpPromo ? tmpPromo && e.data.promo !== 0 : true;
        const newBool = tmpNew ? e.data.new === tmpNew : true;
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
            <div className="vertical-flex filter-border">
                <p>Catégorie</p>
                <select className="marginAuto" id="cat-select"
                    value={currentCategory === null ? props.graines ? "graines" : "all" : currentCategory}
                    onChange={(e) => { setCurrentCategory(e.target.value) }}>
                    <option value="all" selected>Toutes les catégories</option>
                    {
                        props.categories.map(e => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="marginAuto horizontal-flex wrap center-flex filter-border">
                <p>Filtres</p>
                <div className="marginAuto">
                    <label for="new">Nouveautés</label>
                    <input type="checkbox" value="on" name="new"
                        checked={newProduct === null ? props.new : newProduct}
                        onChange={() => { setNewProduct(newProduct === null ? !props.new : !newProduct); }}
                    ></input>
                    <div className="marginAuto">
                        <label for="new">Promotions</label>
                        <input type="checkbox" value="on" name="promo"
                            checked={promo === null ? props.promo : promo}
                            onChange={() => { setPromo(promo === null ? !props.promo : !promo); }}
                        ></input>
                    </div>
                </div>
            </div>
            <div className="filter-border">
                <p>Prix</p>
                <div className="horizontal-flex center-flex wrap marginAuto width50 ">
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
            </div>
            <div className="horizontal-flex center-flex range filter-border" >
                <label>Trier par</label>
                <select onChange={(e) => sortData(e.target.value)}>
                    <option value={"null"} selected>Pas de tri</option>
                    <option value={true} >Prix croissant</option>
                    <option value={false} >Prix décroissant</option>
                </select>
            </div>
        </div>
    );

}