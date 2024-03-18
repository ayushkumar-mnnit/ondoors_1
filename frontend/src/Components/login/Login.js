import React from 'react'
import './login.css'
export const Login = () => {
  return (
    <>
<div className='loginform'>
    
<form>
  <label className='lab'>Email</label>
  <input type="text" className='email' placeholder='enter your email'   name='email'/>
  <label className='lab'>Password</label>
  <input type="text" className='pass' placeholder='enter your password'  name='password'/>
  <button className='btn'>Submit</button>
</form>

</div>


    </>
  )
}
