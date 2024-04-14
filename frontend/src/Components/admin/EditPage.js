import React, { useState ,useEffect} from 'react'
import './edit.css'
import { useAuth } from '../../jwt_Store/jwtStorage'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { Navigate } from 'react-router-dom'



export const EditPage = () => {
    
  const [user, setUser] = useState({
    name:"",
    email:"",
    address:"",
    role:""
  })



const params=useParams()
const {authToken}=useAuth()

  const getUserbyId = async () => {
    try {
        
        const result = await fetch(`http://localhost:5000/admin/allusers/${params.id}`, {
            method: 'GET',
            headers: {
                Authorization: authToken
            }
        })
       
        if(result.ok)
        {
            const data=await result.json()
            console.log(data)
            setUser(data)
            
        }

        

    } catch (error) {
        console.log('Error deleting user:', error)
    }
}


  useEffect(()=>{
    getUserbyId()
  },[])

  console.log('my user',user)


  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
        const result = await fetch(`http://localhost:5000/admin/allusers/update/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: authToken
            },
            body:JSON.stringify(user)
        })

        if(result.ok){
            toast.success('updated');
            setUser({
                name:"",
                email:"",
                address:"",
                role:""
              })
            
        }else{
            toast.error('updation failed')
        }
        
    } catch (error) {
        console.log('Error deleting user:', error);
    }

  }

  const handleChange=async(e)=>{
    const {name,value}=e.target
    setUser({...user,[name]:value})
  }




  return (
    <>
      

      <div className='regform'>
        <form onSubmit={handleSubmit}>
          <label className='lab'>Name</label>
          <input type="text" className='name' placeholder='Enter your name' name='name'onChange={handleChange} value={user.name}  required />
          <label className='lab'>Email</label>
          <input type="email" className='email' placeholder='Enter your email' name='email'onChange={handleChange} value={user.email}  required />
          
          <label className='lab'>Address</label>
          <input type="text" className='address' placeholder='Enter your address' name='address'onChange={handleChange} value={user.address}  required />
          <div className='check'>
            <label className='lab2'>Service provider</label>
            <input type="radio" name="role" id="sp"onChange={handleChange} value='Service Provider'  checked={user.role === 'Service Provider'} required />
            <br/>
            <label className='lab1'>Client</label>
            <input type="radio" name="role" id="clt"onChange={handleChange} value='Client' checked={user.role === 'Client'} required />
          </div>

          <button className='btn'>Save Changes</button>
        </form>
      </div>
    </>
  )
}
