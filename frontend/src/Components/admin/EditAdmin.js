import React, { useState, useEffect } from 'react';
import './editAdmin.css';
import { useAuth } from '../../jwt_Store/jwtStorage';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const EditAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ isAdmin: false });

  const params = useParams();
  const { authToken } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const getUserById = async () => {
    try {
      const result = await fetch(`http://localhost:5000/admin/allusers/${params.id}`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`http://localhost:5000/admin/allusers/update/${params.id}`, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value === 'true' });
  };

  if (loading) return <>Loading...</>;

  return (
    <>
      <div className='profile-container'>
        <div className='profile'>
          <div className='profile-info'>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <h4>Change admin role?</h4>
              </div>
              <div className='check'>
                <label className='lab2'>Make admin</label>
                <input type='radio' name='isAdmin' id='sp' onChange={handleChange} value={true} checked={user.isAdmin === true} required />
                <br />
                <label className='lab1'>Remove admin</label>
                <input type='radio' name='isAdmin' id='clt' onChange={handleChange} value={false} checked={user.isAdmin === false} required />
              </div>
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
