import React from 'react'
import { Navbar } from '../navbar/Navbar'
import logo from '../../images/logo-1.png'
import Footer from '../footer/Footer'
import './hom.css'
import hoimg from '../../images/dor1.png'


export const Home = () => {



  return (
    <>
      <Navbar logo=<img src={logo} alt='ondoors' width={100} height={50} />
        home='Home' services='Services' contact='Contact us' about='About us'
        login='Login' signup='Signup' profile='Profile' admin='Admin' logout='Logout' />

      <div className='hm1'>
        <img src={hoimg} alt="loading.." />

      </div>



  




      <Footer />

    </>
  )
}
