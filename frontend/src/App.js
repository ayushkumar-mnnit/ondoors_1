

import React from 'react'
import { Home } from './Components/home_/Home'
import { Profile } from './Components/profile/Profile'
import { Login } from './Components/login/Login';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { Reg } from './Components/reg/Reg';
import { Contact } from './Components/contact/Contact';
import { Logout } from './Components/logout/Logout';

export const App = () => {
  return (
    <>

    <Router>
<Routes>

<Route path='/' element={<Home/>} ></Route>
<Route path='profile' element={<Profile/>} ></Route>
<Route path='login' element={<Login/>} ></Route>
<Route path='signup' element={<Reg/>} ></Route>
<Route path='contact' element={<Contact/>} ></Route>
<Route path='logout' element={<Logout/>} ></Route>




</Routes>
    </Router>

    </>
  )
}
