import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../jwt_Store/jwtStorage'


export const Logout = () => {
    const {LogoutUser}=useAuth()
 useEffect(()=>{
    LogoutUser()
 },[LogoutUser])

 return <Navigate to='/'/>

}
