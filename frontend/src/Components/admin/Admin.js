import React from 'react';
import './admin.css';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../jwt_Store/jwtStorage';
import { FaUsers } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { RiFeedbackFill} from 'react-icons/ri';
import { FaCircleUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";





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
      

      <div className="admin-container">
        <div className="nav">
          <ul>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/allusers">
                <FaUsers /> Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/allcontacts">
              <BiSolidMessageRoundedDetail />
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/allfeedbacks">
                <RiFeedbackFill />
                Feedbacks
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
              <FaCircleUser />
               Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout">
              <FaSignOutAlt />
               Logout
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
