import React, { useEffect } from 'react';
import './prof.css'; 
import { Link} from 'react-router-dom';
import { MdEdit } from 'react-icons/md'; 
import { useAuth } from '../../jwt_Store/jwtStorage';
import { FaHome } from "react-icons/fa";



export const Profile = () => {

  const {user}=useAuth()

useEffect(()=>{
 
},[user])

  return (
    <>

    <div className="profile-container">
      <div className="profile">

        <div className="profile-info">
          <div className="field">
            <label htmlFor="name">Name:</label>
            <span id="name">{user.name}</span>
          </div>
          <div className="field">
            <label htmlFor="email">Email:</label>
            <span id="email">{user.email}</span>
          </div>
          <div className="field">
            <label htmlFor="address">Address:</label>
            <span id="address">{user.address}</span>
          </div>
          <div className="field">
            <label htmlFor="role">Role:</label>
            <span id="role">{user.role}</span>
          </div>
          
          <div className="edit-icon">
          <Link to='/'>
            <FaHome className='proHome' size={20} />
          </Link>
          <Link to={`/editprofile/${user._id}`}>
          <MdEdit size={26} color="#333" />
          </Link>
        </div>
        </div>
      </div>
    </div>

    </>
  );
};

