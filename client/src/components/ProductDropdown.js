import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate(); 

    return (
        <div className="product-dropdown">
            <h3 onClick={()=>navigate("/articles")}>Graines</h3>
            <h3>Mystery box</h3>
            <h3>Accessoires</h3>
        </div>
    );
}