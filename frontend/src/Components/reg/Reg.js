import React, { useState } from 'react'
import './reg.css'
import logo from '../../images/logo-1.png'
import { Navbar } from '../navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



export const Reg = () => {

  const [user,setuser]=useState(
    {
  name:"",
  email:"",
  password:""  
    }
  )


  const navigate=useNavigate()  // react hooks can be used outside a function only , so store it somewhere to use inside function

const handleChange=(e)=>{
// const [name,value]=e.target

  const name=e.target.name
  const value=e.target.value
  setuser({
    ...user,
    [name]:value
  })
}

const handleSubmit=async(e)=>{
  e.preventDefault()
  console.log(user);
  // alert('registered')
  try
  {
    const result=await fetch('http://localhost:5000/register',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(user)
  })
  console.log(result)

  if(result.ok)
  {
    toast.success('Registeration successful')
    setuser({name:"",email:"",password:""})
    navigate('/')
  }else{
    toast.error('some error occured')
  }

  } catch (error) {
    console.log(error);
  }

}

  return (
    <>

<Navbar logo=<img src={logo} width={100} height={50} alt='logo'/> login='Already a user ? Login now'/>

<div className='regform'>

<form onSubmit={handleSubmit}>
  <label className='lab'>Name</label>
  <input type="text" className='name' placeholder='enter your name' name='name' value={user.name} onChange={handleChange}    />
  <label className='lab'>Email</label>
  <input type="text" className='email' placeholder='enter your email' name='email' value={user.email}  onChange={handleChange}    />
  <label className='lab'>Password</label>
  <input type="password" className='pass' placeholder='enter your password' name='password' value={user.password} onChange={handleChange}    />
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
