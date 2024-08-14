
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AddCard = () => {

    const navigate=useNavigate()

    const [newcard,setNewcard]=useState({title:'',description:''})

    const handleChange=(e)=>{
        const {name,value}=e.target
        setNewcard({...newcard,[name]:value})
    }

    const handleSubmit=async(e)=>{
        try {
            e.preventDefault()
            const result = await fetch(`http://localhost:5000/admin/newcard`, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(newcard)
            });
            if (result.ok) {
                toast.success('New Service Card Added') 
                navigate('/admin/servicecard')

            }else{
                toast.error('Error while Creating new Card')
            }
        } catch (error) {
            console.log('Error while creating new card :', error);
        }
    }

  return (
    <>

<div className='profile-container'>
        <div className='profile'>
          <div className='profile-info'>
            <form onSubmit={handleSubmit}>
              
              <div className='field'>
                <label className='lab'>Title</label>
                <input type="text" className='c-email'  placeholder='Service name' name='title' onChange={handleChange} value={newcard.title}  />
              </div>

              <div className='field'>
                <label className='lab'>Description</label>
                <textarea className="msg" name="description" rows="5" cols="45" placeholder='A brief description of above service' onChange={handleChange}  value={newcard.description}  ></textarea>
              </div>
              <div className='field'>
                <button className='btn-rlog'>Add</button>
              </div>
   
            </form>
          </div>
        </div>
      </div>

    </>
  )
}
