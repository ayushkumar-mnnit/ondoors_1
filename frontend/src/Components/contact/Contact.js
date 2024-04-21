import React, { useEffect, useState } from 'react';
import './cont.css';
import { FaHome } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useAuth } from '../../jwt_Store/jwtStorage';
import { Link } from 'react-router-dom';

export const Contact = () => {
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [userData, setUserData] = useState(true); // 'true' ensures prior name and email of user should present in contact form only for the first time form loading, and after that it sets to false.



  const { user,userAuthenticate } = useAuth();

  if (userData && user) {
    setMsg({
      name: user.name,
      email: user.email,
      message: ""
    });
    setUserData(false);
  }

  useEffect(()=>{
    userAuthenticate()
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMsg({
      ...msg,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg)
      });

      console.log(result);

      if (result.ok) {
        toast.success('Message sent successfully');
        setMsg({ name: "", email: "", message: "" });
      } else {
        toast.error('Some error occurred');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
<Link to='/'>
  <button className='cnt_h' style={{ textDecoration: 'none' }}>Back to Home
  </button>
</Link>

    

      <div className='profile-container'>
        <div className='profile'>
          <div className='profile-info'>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <label className='lab'>Name</label>
                <input type="text" className='c-name' size='20' placeholder='Enter your name' name='name' onChange={handleChange} value={msg.name} />
              </div>
              <div className='field'>
                <label className='lab'>Email</label>
                <input type="text" className='c-email' size='20' placeholder='Enter your email' name='email' onChange={handleChange} value={msg.email} />
              </div>
              <div className='field'>
                <label className='lab'>Message</label>
                <textarea className="msg" name="message" rows="5" cols="40" placeholder='Let us know what you have to say' onChange={handleChange} value={msg.message}></textarea>
              </div>
              <div className='field'>
                <button className='btn-rlog'>Send</button>
              </div>
   
            </form>
          </div>
        </div>
      </div>

    </>
  );
};
