
import React from 'react'
import {createContext,useContext} from 'react'

export const AuthContext=createContext()   

export const AuthProvider = ({children}) => {

    const StoreToken=(tokenFromServer)=>{
        return localStorage.setItem('token',tokenFromServer)
    }


  return  <AuthContext.Provider value={{StoreToken}}>
        {children}
    </AuthContext.Provider> 
  
}


export const useAuth = () => {
    const AuthContextResult=useContext(AuthContext)

    if(!AuthContextResult){throw new Error('useAuth used outside provider ')} 

  return AuthContextResult

}
