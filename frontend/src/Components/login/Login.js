import React, { useState } from 'react';
import './login.css';
import { Navbar } from '../navbar/Navbar';
import logo from '../../images/logo-1.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../jwt_Store/jwtStorage';
import { toast } from 'react-toastify';

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { StoreToken } = useAuth();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (result.ok) {
        toast.success('Login successful');
        const response = await result.json();
        StoreToken(response.token);
        setUser({ email: "", password: "" });
        navigate('/');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar logo={<img src={logo} width={100} height={50} alt='logo'/>} signup="Create a new account"/>
      <div className='profile-container'>
        <div className='profile'>
          <div className='profile-info'>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <label htmlFor='email'>Email:</label>
                <input type="text" className='email' placeholder='Enter your email' name='email' onChange={handleChange} value={user.email} />
              </div>
              <div className='field'>
                <label htmlFor='password'>Password:</label>
                <input type="password" className='password' placeholder='Enter your password' name='password' onChange={handleChange} value={user.password} />
              </div>
              <button className='btn-rlog' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
