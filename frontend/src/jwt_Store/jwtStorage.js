
import React, { useEffect, useState } from 'react'
import {createContext,useContext} from 'react'

export const AuthContext=createContext()   

export const AuthProvider = ({children}) => {
  
  const [token,setToken]=useState(localStorage.getItem('token'))
  
  const [user,setUser]=useState("")
  
  const [loading,setLoading]=useState(true)
  
  const StoreToken=(tokenFromServer)=>{
    setToken(tokenFromServer)
    return localStorage.setItem('token',tokenFromServer)
  }
  
  const authToken=`Bearer ${token}`

    let isLoggedIn=!!token

    
// logout functionality:

const LogoutUser=()=>{
  setToken("")
  return localStorage.removeItem('token')
}

// get loggedin user data--- this is similar to making request to /user route from frontend and , since we may need this user data at various places in our app so instead of making this request everywhere again and again , juts use here once ,with  with contextAPI.

    const userAuthenticate=async()=>{

      try {

        setLoading(true)
        const result=await fetch('http://localhost:5000/user',{
        method:'GET',
        headers:{
          Authorization:authToken
        }
      })

      if(result.ok)
      {
        const data=await result.json()
        console.log('this is logged user:----',data.result);
        setUser(data.result)
        setLoading(false)
      }

      } catch (error) {
        console.log('error fetching user');
      }
      
    }

    useEffect(()=>{
      userAuthenticate()
    },[])

// ---------------------------------------------------------------------

  return  <AuthContext.Provider value={{StoreToken,LogoutUser,isLoggedIn,user,loading,authToken}}>
        {children}
    </AuthContext.Provider> 
  
}



export const useAuth = () => {
    const AuthContextResult=useContext(AuthContext)

    if(!AuthContextResult){throw new Error('useAuth used outside provider ')} 

  return AuthContextResult

}