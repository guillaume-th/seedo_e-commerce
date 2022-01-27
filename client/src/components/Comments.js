import { useEffect, useState } from "react";
import { useLocation, navigate, useNavigate } from "react-router-dom";
import Delete from "../assets/delete.svg";
const API_URL = process.env.REACT_APP_API_URL; 


export default function Comments() {
    const data = useLocation().state;
    const user_id = JSON.parse(localStorage.getItem("user_id"))||[];
    const [refresh, setRefresh] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{

    }, [refresh]);

    const delete_comment = (id_comment) => {
        fetch(`${API_URL}/article/avis/remove/${id_comment}`)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setRefresh(Math.random());
          })
          .catch((err) => console.error(err));
      };
    

    return (
        <div className="wrapper">
            <button onClick={()=> navigate(`/article/${data.id}`)}>Retourner à l'article</button>
            <ul id="comments" className="vertical-flex center-flex" style={{ width: "50%", marginTop : "2rem" }}>
                {data.comments.map((i) => {
                    return (
                        <li className="comment-body" style={{padding : "0.5rem"}}>
                            <p className="comment-name">{i.firstname} {i.lastname}</p>
                            <p className="comment-date">{i.CreationDate.date.slice(0, 10)}</p>
                            <p className="comment-content">{i.content}</p>
                            {user_id == i.user_id &&
                                <img
                                    src={Delete}    
                                    className="comment-icon" onClick={() => { delete_comment(i.id) }}></img>
                            }
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}