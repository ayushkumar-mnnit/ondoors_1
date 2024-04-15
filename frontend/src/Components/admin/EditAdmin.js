import React, { useState ,useEffect} from 'react'
import './editAdmin.css'
import { useAuth } from '../../jwt_Store/jwtStorage'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'




export const EditAdmin = () => {

    const [loading,setLoading]=useState(true);
    
  const [user, setUser] = useState({isAdmin:false})


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
        
        const data=await result.json()
        setUser(data.result)
        if(data){
            setLoading(false);
        }
    
    } catch (error) {
        console.log('Error updating user:', error)
    }
}


  useEffect(()=>{
    getUserbyId()
  },[loading])

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
            setUser({isAdmin:""})
            
              return <Navigate to='/admin/allusers'/>

        }else{
            toast.error('updation failed')
        }
        
    } catch (error) {
        console.log('Error updating user:', error);
    }

  }

  const handleChange=async(e)=>{
    const {name,value}=e.target
    setUser({...user,[name]:value})
  }


  if(loading)return <>loading...</>


  return (



    <>
      

      <div className='regform'>
        <form onSubmit={handleSubmit}>
         <div>
         <h4> Change admin role?</h4>
            <label className='lab2'>Make admin</label>
            <input type="radio" name="isAdmin" id="sp"onChange={handleChange} value={true}  checked={user.isAdmin === true} required />
            <br/>
            <label className='lab1'>Remove admin</label>
            <input type="radio" name="isAdmin" id="clt"onChange={handleChange} value={false} checked={user.isAdmin === false} required />
          </div>

          <button className='btn'>Save Changes</button>
        </form>
      </div>
    </>
  )
}
