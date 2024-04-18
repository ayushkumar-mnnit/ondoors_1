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

  const navigate = useNavigate()

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

      <div className='profile-container'>
        <div className='profile'>
          <div className='profile-info'>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' value={user.name} onChange={handleChange} required />
              </div>
              <div className='field'>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' value={user.email} onChange={handleChange} required />
              </div>
              <div className='field'>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' value={user.password} onChange={handleChange} required />
              </div>
              <div className='field'>
                <label htmlFor='address'>Address:</label>
                <input type='text' id='address' name='address' value={user.address} onChange={handleChange} required />
              </div>
              <div className='check'>
                <label htmlFor='sp' className='lab2'>Service provider</label>
                <input type='radio' id='sp' name='role' value='Service Provider' onChange={handleChange} checked={user.role === 'Service Provider'} required />
                <br/>
                <label htmlFor='clt' className='lab1'>Client</label>
                <input type='radio' id='clt' name='role' value='Client' onChange={handleChange} checked={user.role === 'Client'} required />
              </div>

              {user.role === 'Service Provider' && (
                <div className='field'>
                  <label htmlFor='serviceType'>Service Type:</label>
                  <select id='serviceType' name='serviceType' value={user.serviceType} onChange={handleChange} required>
                    <option value=''>Select Service Type</option>
                    <option value='Type 1'>Type 1</option>
                    <option value='Type 2'>Type 2</option>
                    <option value='Type 3'>Type 3</option>
                  </select>
                </div>
              )}

              <button className='btn-rlog'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
