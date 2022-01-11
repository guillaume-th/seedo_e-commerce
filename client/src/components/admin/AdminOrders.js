import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export default function AdminOrders() {
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(null); 

    useEffect(() => {
        fetch(`${API_URL}/order/all`)
            .then((res) => res.json())
            .then((res => {
                console.log(res);
                setData(res.result);
            }))
    }, [refresh])

    const transformData = (data) => {
        const res = [];
        data.forEach((e) => {
            let found = res.find((elt) => elt.name === e.name);
            if (found) {
                res[res.indexOf(found)].quantity++;
            }
            else {
                e.quantity = 1;
                res.push(e);
            }
        })
        return res;
    }

    const deleteOrder = (id) => {
        fetch(`${API_URL}/order/remove/${id}`)
        .then((res) => res.json())
        .then((res) => {
            setRefresh(Math.random());
        })
        .catch(err => console.error(err));
    }

    if (data) {
        return (
            <div>
                <h2>Commandes</h2>
                {data.map(e => {
                    return (
                        <div key={e.id}>
                            <h3>Commande #{e.id}</h3>
                            <p>par {e.user.firstname_user} {e.user.lastname_user}</p>
                            <p>Statut : {e.status}</p>
                            <p>Prix de la commande : <strong>{e.OrderPrice} €</strong></p>
                            <p>Articles : </p>
                            <ul>
                                {
                                    transformData(e.article).map(i => {
                                        return (
                                            <li key={i.id}>
                                                {i.name} x {i.quantity}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <button onClick={()=>deleteOrder(e.id)}>Annuler cette commande</button>
                        </div>
                    )
                })}
            </div>
        );
    }
    else {
        return (
            <p>Chargement en cours...</p>
        );
    }

}