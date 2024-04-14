import React, { useEffect, useState } from 'react'
import './allfeed.css'
import { useAuth } from '../../jwt_Store/jwtStorage'
import { MdEdit,MdDelete } from "react-icons/md";




export const AllFeedbacks = () => {

    const [users, setUsers] = useState([])
    const { authToken } = useAuth()

    const getAllusers = async () => {

        try {
            const result = await fetch('http://localhost:5000/admin/allfeedbacks', {
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
            const result = await fetch(`http://localhost:5000/admin/allfeedbacks/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authToken
                }
            });
            if (result.ok) {
               getAllusers()// Refresh the users list after deletion
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
                       <th>Feedback</th>
                        <th>Edit</th>
                        <th>Delete</th>
                       </tr>
                    </thead>

                    <tbody>

                        {users.map((cur, index) => {
                            return <tr key={index}>
                               
                                <td>{cur.feedbackMsg}</td>
                                <td><MdEdit /></td>
                                <td><MdDelete className='delbtn' onClick={() => deleteUser(cur._id)} /></td>
                            </tr>
                        })}


                    </tbody>

                </table>
            </div>


        </>
    )
}
