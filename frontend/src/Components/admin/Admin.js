import React from 'react';
import './admin.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../jwt_Store/jwtStorage';
import { FaUsers } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { RiFeedbackFill} from 'react-icons/ri';
import { FaCircleUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineAddCard } from "react-icons/md";
// import shield from '../../images/admin-shield.avif';
import adm2 from '../../images/adm2.jpg';

export const Admin = () => {
  const { user } = useAuth();

  if (!user.isAdmin) {
    return <h1 id='adm1'>Access denied !! You are not Admin</h1>;
  }

  return (
    <>
      <h1 className='wlm'>Welcome ! <span id='admuser'>{user.name}</span> , to Admin Dashboard </h1>
      
      <div className="admin-container" >
        <div className="nav" >
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
            <NavLink to="/admin/servicecard">
              <MdOutlineAddCard/>
               Services
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
    </>
  );
};
