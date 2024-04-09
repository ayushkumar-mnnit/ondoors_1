
import React, { useState } from 'react'
import {createContext,useContext} from 'react'

export const AuthContext=createContext()   

export const AuthProvider = ({children}) => {

  const [token,setToken]=useState(localStorage.getItem('token'))
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



  return  <AuthContext.Provider value={{StoreToken,LogoutUser,isLoggedIn}}>
        {children}
    </AuthContext.Provider> 
  
}



export const useAuth = () => {
    const AuthContextResult=useContext(AuthContext)

    if(!AuthContextResult){throw new Error('useAuth used outside provider ')} 

  return AuthContextResult

}
