
import React from 'react'
import { Cards } from '../cards/Cards'
import { Link } from 'react-router-dom'



export const Service = () => {
 
  return (
    
    <>
    <Link to='/'>
  <button className='cnt_h' style={{ textDecoration: 'none' }}>Back to Home
  </button>
</Link>

      <Cards />
      <Link to='/serviceform'>
        <button className='expl'>Get Started</button></Link>
    </>
  )
}
