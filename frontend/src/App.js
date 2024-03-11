

import React from 'react'
import { Home } from './Components/home_/Home'
import { Profile } from './Components/profile/Profile'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

export const App = () => {
  return (
    <>

    <Router>
<Routes>

<Route path='/' element={<Home/>} ></Route>
<Route path='profile' element={<Profile/>} ></Route>





</Routes>
    </Router>

    </>
  )
}
