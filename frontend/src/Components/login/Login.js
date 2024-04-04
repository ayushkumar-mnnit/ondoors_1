import React from 'react'
import './login.css'
import { Navbar } from '../navbar/Navbar'
import logo from '../../images/logo-1.png'



export const Login = () => {




  return (
    <>
    <Navbar logo=<img src={logo} width={100} height={50} alt='logo'/> signup="Create a new account"/>
<div className='loginform'>
    
<form>
  <label className='lab'>Email</label>
  <input type="text" className='email' placeholder='enter your email'   name='email'/>
  <label className='lab'>Password</label>
  <input type="password" className='pass' placeholder='enter your password'  name='password'/>
  <button className='btn' >Submit</button>
</form>

</div>


    </>
  )
}
