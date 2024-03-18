import React from 'react'
import './reg.css'
export const Reg = () => {
  return (
    <>
<div className='regform'>
    
<form>
  <label className='lab'>Name</label>
  <input type="text" className='name' placeholder='enter your name'   name='name'/>
  <label className='lab'>Email</label>
  <input type="text" className='email' placeholder='enter your email'   name='email'/>
  <label className='lab'>Password</label>
  <input type="text" className='pass' placeholder='enter your password'  name='password'/>
  <div className='check'>
  <label className='lab2'>Service provider</label>
<input type="checkbox" name="servicep" id="sp" /><br/>
  <label className='lab1'>Client</label>
<input type="checkbox" name="client" id="clt" />
  </div>
  

  <button className='btn'>Register</button>
</form>

</div>


    </>
  )
}
