import React, { useState } from 'react'
import './login.css'
import { Navbar } from '../navbar/Navbar'
import logo from '../../images/logo-1.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../jwt_Store/jwtStorage'



export const Login = () => {

  const [user,setuser]=useState(
    {
  email:"",
  password:""  
    }
  )


  const navigate=useNavigate()

  const {StoreToken}=useAuth()

const handleChange=(e)=>{

  const name=e.target.name
  const value=e.target.value
  setuser({
    ...user,
    [name]:value
  })
}

const handleSubmit=async (e)=>{
  e.preventDefault()
  // console.log(user);
  // alert('logged in')

  try
  {
    const result=await fetch('http://localhost:5000/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(user)
  })
  console.log(result)

  if(result.ok)
  { alert('Login successful')

const response=await result.json()
  StoreToken(response.token)

    setuser({email:"",password:""})
    navigate('/profile')
  }else{
    alert('invalid credentials')
  }

  } catch (error) {
    console.log(error);
  }

}





  return (
    <>
    <Navbar logo=<img src={logo} width={100} height={50} alt='logo'/> signup="Create a new account"/>
<div className='loginform'>
    
<form onSubmit={handleSubmit}>
  <label className='lab'>Email</label>
  <input type="text" className='email' placeholder='enter your email'   name='email' onChange={handleChange} value={user.email}/>
  <label className='lab'>Password</label>
  <input type="password" className='pass' placeholder='enter your password'  name='password' onChange={handleChange} value={user.password}/>
  <button className='btn' >Submit</button>
</form>

</div>


    </>
  )
}
