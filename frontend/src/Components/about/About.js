import React from 'react'
import './abt.css'
import { useAuth } from '../../jwt_Store/jwtStorage'

export const About = () => {

    const {user}=useAuth()

  return (
    <>
    <h1>Welcome ! {user?user.name:'User'}</h1>
    </>
  )
}
