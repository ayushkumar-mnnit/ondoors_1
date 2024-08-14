import React, { useState, useEffect } from 'react';
import './edit.css';
import { useAuth } from '../../jwt_Store/jwtStorage';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const EditPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
    serviceType:''
  });

  const params = useParams();
  const { authToken,card} = useAuth();

  const getUserById = async () => {
    try {
      const result = await fetch(`https://ondoors.onrender.com/admin/allusers/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: authToken
        }
      });

      const data = await result.json();
      setUser(data.result);
      if (data) {
        setLoading(false);
      }

    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  useEffect(() => {
    getUserById();
  }, [loading]);

  console.log('my user', user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`https://ondoors.onrender.com/admin/allusers/update/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken
        },
        body: JSON.stringify(user)
      });

      if (result.ok) {
        toast.success('Updated');
        navigate('/admin/allusers');
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  if (loading) return <>Loading...</>;

  return (
    <>
      <div className='profile-container'>
        <div className='profile'>
          <div className='profile-info'>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <label className='lab'>Name</label>
                <input type="text" className='name-input' placeholder='Enter your name' name='name' onChange={handleChange} value={user.name} required />
              </div>
              <div className='field'>
                <label className='lab'>Email</label>
                <input type="email" className='email-input' placeholder='Enter your email' name='email' onChange={handleChange} value={user.email} required />
              </div>
              <div className='field'>
                <label className='lab'>Address</label>
                <input type="text" className='address-input' placeholder='Enter your address' name='address' onChange={handleChange} value={user.address} required />
              </div>
              <div className='check'>
                <label className='lab2'>Service provider</label>
                <input type="radio" name="role" id="sp" onChange={handleChange} value='Service Provider' checked={user.role === 'Service Provider'} required />
                <br />
                <label className='lab1'>Client</label>
                <input type="radio" name="role" id="clt" onChange={handleChange} value='Client' checked={user.role === 'Client'} required />
              </div>
              
             
              {user.role === 'Service Provider' && (
                <div className='field'>
                  <label htmlFor='serviceType'>Service Type:</label>
                  <select id='serviceType' name='serviceType' value={user.serviceType} onChange={handleChange} required>
                    <option value=''>Select Service Type</option> {/* Add a default option */}
                    {card.map((cur,index)=>{
                      return <option key={index} value={cur.title}>{cur.title}</option> 
                    })}
                  </select>
                </div>
              )}
                  
              <div className='field'>
                <button className='btn-rlog'>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
