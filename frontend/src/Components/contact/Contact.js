

import React, { useState } from 'react'
import './cont.css'
import { Navbar } from '../navbar/Navbar'
import logo from '../../images/logo-1.png'
import { toast } from 'react-toastify'
import { useAuth } from '../../jwt_Store/jwtStorage'


export const Contact = () => {

    const [msg,setMsg]=useState({
        name:"",
        email:"",
        message:""
    })

const [userData,setUserData]=useState(true)  // 'true' ensures prior name and email of user should present in contact form only for the first time form loading, and after that it sets to false.

    const {user}=useAuth() 

    if(userData && user)
    {
      setMsg({
        name:user.name,
        email:user.email,
        message:""
      })
      setUserData(false)
    }




    const handleChange=(e)=>{
        const {name,value}=e.target
        setMsg({
            ...msg,
            [name]:value
        })
    }


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {   
        const result=await fetch('http://localhost:5000/contact',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(msg)
          })

          console.log(result)

          if(result.ok){
            toast.success('Message sent successfully')
            setMsg({name:"",email:"",message:""})
          }else{
            toast.error('some error occured')
          }

        } catch (error) {
            console.log(error)
        }

    }



  return (
    <>

    <Navbar logo=<img src={logo} alt='ondoors' width={100} height={50} /> />
        
    <div className='contactform'>
    
    <form onSubmit={handleSubmit}>
      <label className='lab'>Name</label>
      <input type="text" className='c-name' size='20' placeholder='enter your name'   name='name' onChange={handleChange} value={msg.name}/>
      <label className='lab'>Email</label>
      <input type="text" className='c-email' size='20'  placeholder='enter your email'   name='email' onChange={handleChange} value={msg.email}/>
      <label className='lab'>Message</label>
      <textarea className="msg" name="message" rows="5" cols="40" placeholder='Let us know what you have to say' onChange={handleChange} value={msg.message}></textarea>
      
      <button className='btn' >Send</button>
    </form>
    
    </div>
        
    </>
  )
}
