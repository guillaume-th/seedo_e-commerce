import React from 'react';
import Graine from './seed.png';
import User from './user.svg';
import Shop from './shop.svg';
import Title from './title.png';
import Search from './search.svg'
import { useNavigate } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className='back'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="logo clickable" onClick={()=> navigate("/")} >
                        <img className="graine" src={Graine} alt="Seed_logo" />
                        <img className="title" src={Title} alt="" />
                    </div>
                    <form className="d-flex search_bar px-0">
                        <input className="form-control search pr-0" type="text" placeholder="Search" />
                        <button className="btn but"><img className="loupe" src={Search} alt="search_logo" /></button>
                    </form>
                    <div className="icon">
                        <img className="Shop clickable" src={Shop} alt="Shop_logo" />
                        <img className="User clickable" src={User} onClick={() => navigate("/profile")} alt="User_logo" />
                    </div>
                </div>
            </nav>
        </div>
    )
}