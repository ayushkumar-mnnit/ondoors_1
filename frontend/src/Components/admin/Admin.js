import React from 'react';
import './admin.css';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../jwt_Store/jwtStorage';
import { Navbar } from '../navbar/Navbar';
import logo from '../../images/logo-1.png';
import { FaUsers } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { MdContacts } from 'react-icons/md';
import { RiFeedbackFill} from 'react-icons/ri';

export const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Access denied !! You are not Admin</h1>
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar
        logo={<img src={logo} alt="ondoors" width={100} height={50} />}
        services="Services"
        contact="Contact us"
        about="About us"
        profile="Profile"
        logout="Logout"
      />

      <div className="admin-container">
        <div className="nav">
          <ul>
            <li>
              <NavLink to="/admin">
                <FaHome />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/allusers">
                <FaUsers /> Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/allcontacts">
                <MdContacts />
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/allfeedbacks">
                <RiFeedbackFill />
                Feedbacks
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
      
      <div className="homepage-content">
        
      </div>
    </>
  );
};
