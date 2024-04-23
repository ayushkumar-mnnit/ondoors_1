
import React, { useState } from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../jwt_Store/jwtStorage'
import { MdVerifiedUser } from "react-icons/md"


export const Navbar = (props) => {

  const {isLoggedIn,user}=useAuth()


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container"> 
    <NavLink className="navbar-brand" to="/">{props.logo}</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        {!isLoggedIn?
          <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">{props.home}</NavLink>
        </li>:void 0
        }
       
       
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/about">{props.about}</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/contact">{props.contact}</NavLink>
        </li>
       

      {isLoggedIn
        ?
        <>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/service">{props.services}</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/profile">{props.profile}</NavLink>
        </li>
        

        {user.isAdmin?
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/admin"><MdVerifiedUser className='adm'/>{props.admin}</NavLink>
        </li>:void 0
        }


        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/logout">{props.logout}</NavLink>
        </li>
        </>
        
        :
        <>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/login">{props.login}</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/signup">{props.signup}</NavLink>
        </li>
        </>
        }
          </ul>
    </div>
  </div>
</nav>
    </>
  )
}





