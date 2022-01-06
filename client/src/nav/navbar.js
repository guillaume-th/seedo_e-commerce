import React from 'react';
import Graine from './seed.png';
import User from './user.svg';
import Shop from './shop.svg';
import Title from './title.png';
import Search from './search.svg'

// import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navbar() {

    return (
        <div className='back'>
            <nav class="navbar navbar-expand-lg">
                
               
                <div class="container-fluid">
                    <div class="logo">
                   
                     <img class="graine" src={Graine} alt="Seed_logo" />
                     <img class="title" src={Title} alt="" />
                   
                     
                     </div>
     
                    <form class="d-flex search_bar px-0">
                    <input class="form-control search pr-0" type="text" placeholder="Search"/>
                    <button class="btn but"><img class="loupe" src={Search} alt="search_logo"/></button>
                    </form>
                    <div class="icon">
                    <img class="Shop" src={Shop} alt="Shop_logo" />
                    <img class="User" src={User} alt="User_logo" />
                    </div>
                </div>
            </nav>
        </div>
    )
}