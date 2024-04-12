import React, { useState } from 'react';
import './reg.css';
import logo from '../../images/logo-1.png';
import { Navbar } from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Reg = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: ''  
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    
    try {
      const result = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      console.log(result);

      if (result.ok) {
        toast.success('Registration successful');
        setUser({ name: '', email: '', password: '', address: '', role: '' });
        navigate('/');
      } else {
        toast.error('Some error occurred');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar logo={<img src={logo} width={100} height={50} alt='logo'/>} login='Already a user ? Login now'/>

      <div className='regform'>
        <form onSubmit={handleSubmit}>
          <label className='lab'>Name</label>
          <input type="text" className='name' placeholder='Enter your name' name='name' value={user.name} onChange={handleChange} required />
          <label className='lab'>Email</label>
          <input type="email" className='email' placeholder='Enter your email' name='email' value={user.email} onChange={handleChange} required />
          <label className='lab'>Password</label>
          <input type="password" className='pass' placeholder='Enter your password' name='password' value={user.password} onChange={handleChange} required />
          <label className='lab'>Address</label>
          <input type="text" className='address' placeholder='Enter your address' name='address' value={user.address} onChange={handleChange} required />
          <div className='check'>
            <label className='lab2'>Service provider</label>
            <input type="radio" name="role" id="sp" value="Service Provider" onChange={handleChange} checked={user.role === 'Service Provider'} required />
            <br/>
            <label className='lab1'>Client</label>
            <input type="radio" name="role" id="clt" value="Client" onChange={handleChange} checked={user.role === 'Client'} required />
          </div>

          <button className='btn'>Register</button>
        </form>
      </div>
    </>
  );
};
