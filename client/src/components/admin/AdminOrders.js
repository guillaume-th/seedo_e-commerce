import { useEffect, useState } from "react";
import AdminShipping from "./AdminShipping";
const API_URL = process.env.REACT_APP_API_URL;

export default function AdminOrders() {
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/order/all`)
            .then((res) => res.json())
            .then((res => {
                setData(res.result);
            }))
    }, [refresh])

    const deleteOrder = (id) => {
        fetch(`${API_URL}/order/remove/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setRefresh(Math.random());
            })
            .catch(err => console.error(err));
    }

    const jsonToCsv = () => {
        let csv = "data:text/csv;charset=utf-8,ID, Status, Price, Articles, Client\r\n";
        data.forEach((e) => {
            csv += `${e.id}, ${e.status}, ${e.OrderPrice}€, ${joinArticle(e.article)}, ${e.user.firstname_user} ${e.user.lastname_user}\r\n`;
        });
        console.log(csv);
        let encodedURI = encodeURI(csv);
        window.open(encodedURI);
    }

    const joinArticle = (array) => {
        let str = "";
        array.forEach((e) => {
            str += e.name + " - ";
        });
        return str.slice(0, -3);
    };

    if (data) {
        return (
            <div className="wrapper">
                <div className="orders-admin">
                    <AdminShipping />
                    <h2>Commandes</h2>
                    <button onClick={() => jsonToCsv()}>Télécharger au format Csv</button>
                    <div className="orders-wrapper">
                        {data.map(e => {
                            return (
                                <div key={e.id} className="order-admin">
                                    <h3>Commande #{e.id}</h3>
                                    <p>par {e.user.firstname_user} {e.user.lastname_user}</p>
                                    <p>Statut : {e.status}</p>
                                    <p>Articles : </p>
                                    <ul>
                                        {
                                            e.article.map(i => {
                                                return (
                                                    <li key={i.id}>
                                                        {i.name} x {i.quantity}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    {/* <div st!yle={{ display: "flex" }}> */}
                                    <p>Prix de la commande : <strong>{e.OrderPrice} €</strong></p>
                                    <button onClick={() => deleteOrder(e.id)}>Annuler cette commande</button>
                                    {/* </div> */}
                                </div>
                            )
                        })}
                    </div>
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