import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const API_URL = process.env.REACT_APP_API_URL;


export default function MysteryUser() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/mystery/mystery_user/${id}`)
            .then(res => res.json())
            .then(res => {
                setData(res);
                console.log(res);
            })
            .catch(err => console.error(err));
    }, []);

    const editmystery = (id) => {
        navigate("/mystery/edit/" + id);
    }

    if (data) {
        return (
            <div className="wrapper">
                <button onClick={() => editmystery(id)}>Retour</button>
                <div className="orders-admin">
                    <div>
                        {
                            data.map(e => {
                                return (
                                    <div className="order-admin card">
                                        <h3>
                                            {e.firstname + " "}
                                            {e.lastname}
                                        </h3>

                                        <p>
                                            {e.email}
                                        </p>

                                        <p>
                                            {e.abonnement.date.slice(0, -10)}
                                        </p>

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
