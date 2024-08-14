import React, { useState, useEffect } from 'react';
import './editpro.css'; 
import { useAuth } from '../../jwt_Store/jwtStorage';
import { MdPublishedWithChanges } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




export const EditProfile = () => {
    
    const navigate=useNavigate()
    const { user,authToken,card} = useAuth();
    const params=useParams()
    const [data, setData] = useState({
        name: '',
        address: '',
        role: '',
        serviceType:''
    });

    // Initialize state once user data is available
    useEffect(() => {
        if (user) {
            setData({
                name: user.name || '',
                address: user.address || '',
                role: user.role || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
         
            const result=await fetch(`https://ondoors.onrender.com/profile/update/${params.id}`,{
               
                method:"PATCH",
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: authToken
                },
                body:JSON.stringify(data)
            })

            if (result.ok) {
                toast.success('updated');
                navigate('/profile'); 
            } else {
                toast.error('updation failed');
            }

        } catch (error) {
            console.log(error);
        }

    };

    console.log(data);
    return (
        <div className="edit-profile-container">
            <div className="edit-profile">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="edit-profile-info">
                        <div className="edit-field">
                            <label htmlFor="edit-name">Name:</label>
                            <input type="text" id="edit-name" name="name" value={data.name} onChange={handleChange} />
                        </div>
                        <div className="edit-field dim">
                            <label htmlFor="edit-email">Email:</label>
                            <input type="email" id="edit-email" name="email" value={user ? user.email : ''} readOnly />
                            <h6 id='note'>Contact admin to update email address</h6>
                        </div>
                        <div className="edit-field">
                            <label htmlFor="edit-address">Address:</label>
                            <input type="text" id="edit-address" name="address" value={data.address} onChange={handleChange} />
                        </div>
                        <div className="edit-field">
                            <label>Role:</label>
                            <div className="edit-radio-buttons">
                                <input type="radio" id="edit-role-client" name="role" value="Client" checked={data.role === 'Client'} onChange={handleChange} />
                                <label htmlFor="edit-role-client">Client</label>
                                <input type="radio" id="edit-role-provider" name="role" value="Service Provider" checked={data.role === 'Service Provider'} onChange={handleChange} />
                                <label htmlFor="edit-role-provider">Service Provider</label>
                            </div>
                        </div>
                        {data.role === 'Service Provider' && (
                <div className='field'>
                  <label htmlFor='serviceType'>Service Type:</label>
                  <select id='serviceType' name='serviceType' value={data.serviceType} onChange={handleChange} required>
                    <option value=''>Select Service Type</option> {/* Add a default option */}
                    {card.map((cur,index)=>{
                      return <option key={index} value={cur.title}>{cur.title}</option> 
                    })}
                  </select>
                </div>
              )}
                    </div>
                    <button className='btn-rlog' type="submit"><MdPublishedWithChanges size={20} /></button>
                </form>

            </div>
        </div>
    );
};
