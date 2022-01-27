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
            <div>
                <button onClick={() => editmystery(id)}>retour</button>

                <div>
                    {
                        data.map(e => {
                            return (
                                <div>
                                    {e.firstname}
                                    {e.lastname}
                                    {e.email}
                                    {e.abonnement.date}
                                </div>
                            )
                        })
                    }
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
