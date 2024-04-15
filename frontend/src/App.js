

import React from 'react'
import { Home } from './Components/home_/Home'
import { Profile } from './Components/profile/Profile'
import { Login } from './Components/login/Login';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { Reg } from './Components/reg/Reg';
import { Contact } from './Components/contact/Contact';
import { Logout } from './Components/logout/Logout';
import { About } from './Components/about/About';
import { Service } from './Components/services_/Service';
import { Allusers } from './Components/admin/Allusers';
import { AllContacts } from './Components/admin/AllContacts';
import { AllFeedbacks } from './Components/admin/AllFeedbacks';
import { Admin } from './Components/admin/Admin';
import { EditPage } from './Components/admin/EditPage';
import { EditAdmin } from './Components/admin/EditAdmin';

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
<Route path='about' element={<About/>} ></Route>
<Route path='/service' element={<Service/>}></Route>

{/* nested routes for admin panel */}

<Route path='/admin' element={<Admin/>}>

<Route path='allusers' element={<Allusers/>}></Route>
<Route path='allcontacts' element={<AllContacts/>}></Route>
<Route path='allfeedbacks' element={<AllFeedbacks/>}></Route>
<Route path='allusers/:id/editpage' element={<EditPage/>}></Route>
<Route path='allusers/:id/editadminpage' element={<EditAdmin/>}></Route>

</Route>

  

</Routes>
    </Router>

    </>
  )
}
