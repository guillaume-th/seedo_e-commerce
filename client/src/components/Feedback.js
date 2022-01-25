import { useEffect, useState } from "react";

export default function Feedback(props) {
    const [open, setOpen] = useState(props.open); 

    useEffect(() => {
        setOpen(props.open); 
        setTimeout(()=>{
            setOpen(false);
            props.setOpen(false);
        }, 6000);
        window.addEventListener("keydown", e => {
            setOpen(false);
            props.setOpen(false);
        });
    }, [props]);

    if (open) {
        return (
            <div className="feedback-wrapper">
                <p className={props.error === true ? "feedback-error" : "feedback-success"}>{props.message}</p>
            </div>
        );
    }
    else {
        return null;
    }

}