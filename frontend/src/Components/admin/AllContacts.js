import React, { useEffect, useState } from 'react'
import './allcont.css'
import { useAuth } from '../../jwt_Store/jwtStorage'
import { MdEdit,MdDelete } from "react-icons/md";


export const AllContacts = () => {

    const [users, setUsers] = useState([])
    const { authToken } = useAuth()
 

    const getAllusers = async () => {

        try {
            const result = await fetch('https://ondoors.onrender.com/admin/allcontacts', {
                method: 'GET',
                headers: {
                    Authorization: authToken
                }
            })
            const data = await result.json()
            console.log(data)
            console.log(data.result)

            setUsers(data.result)


        } catch (error) {
            console.log('error fetching users')


        }

    }



    const deleteUser = async (id) => {
        try {
            const result = await fetch(`https://ondoors.onrender.com/admin/allcontacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authToken
                }
            });
            if (result.ok) {
                getAllusers() // Refresh the users list after deletion
               
            }
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };




    useEffect(() => {
        getAllusers()
    }, [])



    return (
        <>

            <div className="users-data">
                <table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                       <th>Message</th>
                        <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((cur, index) => {
                            return <tr key={index}>
                                <td>{cur.name}</td>
                                <td>{cur.email}</td>
                                <td>{cur.message}</td>
                                <td><MdDelete className='delbtn' onClick={() => deleteUser(cur._id)} /></td>
                            </tr>
                        })}


                    </tbody>

                </table>
            </div>


        </>
    )
}

