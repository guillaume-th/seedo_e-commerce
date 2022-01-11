import {useEffect, useState} from "react"; 
const API_URL = process.env.REACT_APP_API_URL; 

export default function AdminOrders(){
    const [data, setData] = useState(null);
    
    useEffect(()=>{
        fetch(`${API_URL}/order/all`)
        .then((res) => res.json())
        .then((res => {
            
        }))
    }, [])
    return(

    );
}