import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import { reduce } from "../utils";
import { useSelector } from "react-redux";
const API_URL = process.env.REACT_APP_API_URL;

export default function OrderListing() {
    const [data, setData] = useState(null);
    const fidel = useSelector((state) => state.fidel.value);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${API_URL}/order/select/user/${id}`, {
            method: "POST",
            body: data,
        })
            .then(res => res.json())
            .then(res => {
                setData(res);
            })
            .catch(err => console.error(err));
    }, []);

    const createPdf = (data) => {
        const pdf = new jsPDF();
        let content = `SEEDO\nFacture #${data.id}\n\nClient : ${data.user.firstname_user} ${data.user.lastname_user} - ${data.creation_date.date.slice(0, 10)}\n${data.user.email_user}\n\n`;
        if(fidel)
            content += "Vous bénéficiez d'une réduction de 10% sur chaque produits\n\n";
        data.article.forEach((e) => {
            content += e.name + " x "+e.quantity;
            const len = 100 - (e.name.length + (e.quantity +"").length + (e.price + "").length + 3) ;
            for (let i = 0; i < len; i++) {
                content += ".";
            }
            content += e.price + "€\n";
        });
        content += `\n----------------------\nTotal : ${reduce(data.article, false)}€\n----------------------\n`;
        if(fidel)
            content += `\n----------------------\nTotal après réduction : ${reduce(data.article)}€\n----------------------\n`;
        pdf.text(content, 10, 10);
        pdf.save(`facture-${Date.now()}.pdf`);
    };

    // const reduceArticle = (articles) => {
    //     let total = articles[0].price * articles[0].quantity;
    //     for (let i = 1; i < articles.length; i++) {
    //         total += articles[i].price * articles[i].quantity;
    //     }
    //     return total;
    // };


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
                                        <button onClick={() => createPdf(e)}>Télécharger la facture</button>
                                        <p>par {e.user.firstname_user} {e.user.lastname_user}</p>
                                        <p>Statut : {e.status}</p>
                                        <p>Articles : </p>
                                        <ul>
                                            {
                                                e.article.map(i => {
                                                    return (
                                                        <li key={e.id + "art-" + i.id}>
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
