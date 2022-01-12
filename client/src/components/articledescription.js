import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;


export default function ArticleDetail() {
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch(`${API_URL}/article/${id}`)
            .then(res => res.json())
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.error(err));
    }, [refresh]);

    if (data) {
        return (
            <div>
                <h2>{data.name}</h2>
                        <div key={data.id}>
                        <p>{data.categoriesName}</p>
                            <p>photo : </p>
                            <ul>
                                {
                                    data.photos.map(i => {
                                        return (
                                            i &&
                                                <img key={i.id} src={i.imgLink}></img>
            
                                        )
                                    })
                                }
                            </ul>
                            <p>{data.description}</p>
                            <p>Prix {data.price} €</p>
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
