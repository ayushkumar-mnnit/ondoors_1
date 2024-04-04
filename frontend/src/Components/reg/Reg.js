import React, { useState } from 'react'
import './reg.css'
import logo from '../../images/logo-1.png'
import { Navbar } from '../navbar/Navbar'


export const Reg = () => {

  const {User,setUser}=useState({
   
      name:'',
      email:'',
      password:''
    
  })


  return (
    <>

<Navbar logo=<img src={logo} width={100} height={50} alt='logo'/> login='Already a user ? Login now'/>

<div className='regform'>

<form>
  <label className='lab'>Name</label>
  <input type="text" className='name' placeholder='enter your name'    name='name'  />
  <label className='lab'>Email</label>
  <input type="text" className='email' placeholder='enter your email'    name='email'  />
  <label className='lab'>Password</label>
  <input type="password" className='pass' placeholder='enter your password'   name='password'  />
  <div className='check'>
  <label className='lab2'>Service provider</label>
<input type="checkbox" name="servicep" id="sp" /><br/>
  <label className='lab1'>Client</label>
<input type="checkbox" name="client" id="clt" />
  </div>

  <button className='btn' >Register</button>
</form>

</div>


    </>
  )
}
