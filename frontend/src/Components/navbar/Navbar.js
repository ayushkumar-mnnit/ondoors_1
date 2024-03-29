
import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'


export const Navbar = (props) => {



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container"> 
    <Link className="navbar-brand" to="/">{props.logo}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">{props.home}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/services">{props.services}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">{props.about}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/contact">{props.contact}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">{props.login}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/signup">{props.signup}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">{props.logout}</Link>
        </li>
       
          </ul>
   
    </div>
  </div>
</nav>
    </>
  )
}

