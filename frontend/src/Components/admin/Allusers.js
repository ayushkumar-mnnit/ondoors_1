import React, { useEffect, useState } from 'react';
import './alluser.css';
import { useAuth } from '../../jwt_Store/jwtStorage';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Allusers = () => {
    const [users, setUsers] = useState([]);
    const { authToken } = useAuth();

    const getAllUsers = async () => {
        try {
            const result = await fetch('http://localhost:5000/admin/allusers', {
                method: 'GET',
                headers: {
                    Authorization: authToken
                }
            });
            const data = await result.json();
            console.log(data);
            setUsers(data.result);
        } catch (error) {
            console.log('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const result = await fetch(`http://localhost:5000/admin/allusers/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authToken
                }
            });
            if (result.ok) {
                getAllUsers(); // Refresh the users list after deletion
            }
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <div className="users-data">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Role</th>
                            <th>Admin role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((cur, index) => (
                            <tr key={index}>
                                <td>{cur.name}</td>
                                <td>{cur.email}</td>
                                <td>{cur.role}</td>
                                <td>{cur.isAdmin}</td>
                                <td><Link to={`/admin/allusers/${cur._id}/editpage`}><MdEdit className='edibtn'/></Link></td>
                                <td><MdDelete className='delbtn' onClick={() => deleteUser(cur._id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
