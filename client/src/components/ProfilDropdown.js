import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAdmin } from "../AdminSlice";
import setOpenProfil from "../ProfilSlice";
import "../styles/ProfilDropdown.css";

export default function ProfilDropdown(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_id = localStorage.getItem("user_id");
    
    if(user_id){
        return (
            <div className="profilDropdown">    
                <p onClick={() => {navigate("/profile")
                                        dispatch(setOpenProfil(false));
                                }} >Voir le profil</p>

                <p onClick={() => {navigate("/Profile/"+ user_id)
                                        dispatch(setOpenProfil(false));
                                }}> Mes commandes </p>

                <p onClick={() => {
                            localStorage.clear()
                            dispatch(updateAdmin(false));
                            navigate("/");
                        }
                    }> Se déconnecter</p>
    
            </div>
           
        )
    }else{
        return (
            <div className="profilDropdown">
                <p onClick={() => {navigate("/auth")}}>Se connecter</p>
            </div>
        )
    }
    
}

