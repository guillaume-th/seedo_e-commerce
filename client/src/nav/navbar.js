import React from 'react';
import { Button } from 'react-bootstrap';
import Marron from './marron.jpeg';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navbar() {

    return (
    <div className='back'> 
      <nav class="navbar navbar-expand-lg">
         
  <div class="container-fluid">
    <a class="navbar-brand" href="#">LOGO</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
 <form class="d-flex">
        <input class="form-control me-sm-2" type="text" placeholder="Search"/>
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
   
  </div>
</nav>
    </div>
    )
}