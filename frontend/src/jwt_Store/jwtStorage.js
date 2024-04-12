
import React, { useEffect, useState } from 'react'
import {createContext,useContext} from 'react'


export const AuthContext=createContext()   

export const AuthProvider = ({children}) => {

  const [token,setToken]=useState(localStorage.getItem('token'))

  const [user,setUser]=useState("")

  const StoreToken=(tokenFromServer)=>{
        setToken(tokenFromServer)
        return localStorage.setItem('token',tokenFromServer)
    }


    let isLoggedIn=!!token

    
// logout functionality:

const LogoutUser=()=>{
  setToken("")
  return localStorage.removeItem('token')
}

// jWt authentication : get loggedin user data------------------------------------------------------

    const userAuthenticate=async()=>{

      try {
        const result=await fetch('http://localhost:5000/user',{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })


      if(result.ok)
      {
        const data=await result.json()
        console.log('this is logged user:----',data.result);
        setUser(data.result)
        
      }

      } catch (error) {
        console.log('error fetching user');
      }
      
    }

    useEffect(()=>{
      userAuthenticate()
    },[])

// ---------------------------------------------------------------------

  return  <AuthContext.Provider value={{StoreToken,LogoutUser,isLoggedIn,user}}>
        {children}
    </AuthContext.Provider> 
  
}



export const useAuth = () => {
    const AuthContextResult=useContext(AuthContext)

    if(!AuthContextResult){throw new Error('useAuth used outside provider ')} 

  return AuthContextResult

}
