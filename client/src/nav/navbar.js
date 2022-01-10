import React from 'react';
import User from './userGreen.png';
import Shop from './shopGreen.png';
import Logo from './logoSeedo.png';
import Search from './searchWhite.png'
import { useNavigate } from 'react-router-dom';



export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div id="navbar">
            <div id="logo" onClick={()=> navigate("/")}>
                <img id="graine" src={Logo} alt="Seed_logo" />
            </div>
            <form className="search_bar">
                <input className="search" id="search" type="text" placeholder="Search" />
                <img id="loupe" src={Search} alt="search_logo" />
            </form>
            <div id="icon">
                <img id="Shop" src={Shop} alt="Shop_logo" />
                <img id="User" src={User} onClick={() => navigate("/profile")} alt="User_logo" />
            </div>
        </div>
    )
}