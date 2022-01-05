import { useRef, useEffect, useState } from "react";
const API_URL = process.env.API_URL;

export default function Profile() {
    const userForm = useRef();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        fetch(`${API_URL}/user/${user_id}`)
            .then((res) => res.json())
            .then((res) => setUser(res))
            .catch((err) => console.error(err));
    }, []);

    const submitUserData = (e) => {
        e.preventDefault();
        const data = new FormData(userForm.current);
        fetch(`${API_URL}/user/${user_id}/edit`,
            {
                method: "POST",
                body: data,
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "ok") {
                    setUser(res.data);
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <form ref={userForm} onSubmit={submitUserData}>

        </form>
    );


}
