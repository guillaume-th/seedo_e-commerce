import { useEffect, useState } from "react";
import  {useParams} from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

export default function OrderListing() {
    const user_id = localStorage.getItem("user_id");
    const [data, setData] = useState(null);
    const  {id} = useParams();
    const [refresh, setRefresh] = useState(null);
    
    const transformData = (data) => {
        const res = [];
        data.forEach((e) => {
            let found = res.find((elt) => elt.name === e.name);
            console.log(found);
            if (found !== undefined) {
                res[res.indexOf(found)].quantity++;
            }
            else {
                e.quantity = 1;
                res.push(e);
            }
        })
        return res;
    }

    useEffect(() => {
        fetch(`${API_URL}/order/select/${id}`, {
            method: "POST",
            body: data,
        })
            .then(res => res.json())
            .then(res => {
                setData(res);
            })
            .catch(err => console.error(err));
    }, [refresh]);
    console.log(data);
    if (data) {
        return (
            <div className="wrapper">
                <div className="orders-admin">
                    <h2>Vos Commandes</h2>
                    <div className="orders-wrapper">
                    {
                        data.result.map((e) => {
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
                                   
                                        <p>Prix de la commande : <strong>{e.OrderPrice} €</strong></p>
                
                                </div>
                             
                            )
                        })
                    }
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
