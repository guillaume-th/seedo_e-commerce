import { useState, useEffect } from "react";

export default function Cart() {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("cart")));
    }, []);

    if (data) {
        return (
            <div className="cart">
                {
                    data.map((e) => {
                        return (
                            <div>
                                <p style={{ marginBottom: ".25rem" }}>{e.name}</p>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>{e.selectedQuantity}</p>
                                    <p>{e.price * e.selectedQuantity} €</p>
                                </div>
                            </div>
                        )
                    })
                }
                <div>
                    <p style={{ marginBottom: ".25rem" }}> Total : {data.reduce((a, b) => (a.selectedQuantity * a.price) + (b.selectedQuantity * b.price))}</p>
                    {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>{e.selectedQuantity}</p>
                        <p>{e.price * e.selectedQuantity} €</p>
                    </div> */}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="cart">
                <p>Pas de produits dans le panier</p>
            </div>
        );
    }

}