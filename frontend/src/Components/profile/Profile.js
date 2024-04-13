import React, { useState, useEffect } from 'react';
import './prof.css';
import { toast } from 'react-toastify';

const profImg = 'https://cdn-icons-png.flaticon.com/256/149/149071.png';

export const Profile = () => {
  const [prof, setProf] = useState({
    name: '',
    email: '',
    address: '',
    role: ''
  });

  const handleChange = (e) => {
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:5000/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prof)
      });

      if (result.ok) {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Some error occurred while updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile');
    }
  }

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src={profImg} alt="userImg" />
            <span className="font-weight-bold">{prof.name}</span>
            <span className="text-black-50">{prof.email}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="name"
                  name="name"
                  value={prof.name}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="email id"
                  value={prof.email}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Address</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="address"
                  value={prof.address}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Role</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="role"
                  placeholder="user or client"
                  value={prof.role}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" onClick={handleSubmit} type="button">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
