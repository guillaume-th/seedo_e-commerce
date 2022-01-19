import { useRef, useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

export default function AdminShipping() {
    const weightForm = useRef();
    const distanceForm = useRef();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/shipping/all`)
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => console.error(err));
    }, []);

    const editDistance = (e) => {
        e.preventDefault();
        const formData = new FormData(distanceForm.current);
        fetch(`${API_URL}/shipping/edit/kg`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === "ok") {
                    const temp = { ...data };
                    temp.distance = formData.get("distance");
                    setData(temp)
                }
            })
            .catch(err => console.error(err));
    };
    const editWeight = (e) => {
        e.preventDefault();
        const formData = new FormData(weightForm.current);
        fetch(`${API_URL}/shipping/edit/kg`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === "ok") {
                    const temp = { ...data };
                    temp.kg = formData.get("kg");
                    setData(temp)
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h3>Frais de livraison</h3>
            <form ref={distanceForm} onSubmit={editDistance}>
                <label>Prix pour 100km </label>
                <input type="number" defaultValue={data ? data.distance : 5}></input>
                <input type="submit" value="Changer"></input>
            </form>
            <form ref={weightForm} onSubmit={editWeight}>
                <label>Prix pour 1kg </label>
                <input type="number" defaultValue={data ? data.weight : 5}></input>
                <input type="submit" value="Changer"></input>
            </form>
        </div>
    );

}