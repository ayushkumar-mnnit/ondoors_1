
import React, { useState,useEffect } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './adminServ.css'
import { Load } from '../loading/Load'

export const AdminService = () => {
    const [loading,setLoading]=useState(true)
    const [serv, setServ] = useState([]);


    // get card:

    const getCards = async () => {
        try {
            const result = await fetch('http://localhost:5000/newcard/getcard', {
                method: 'GET',
            });
            const data = await result.json();
            if(data)
            {
                setLoading(false)
            }
            setServ(data.cardData);
        } catch (error) {
            console.log('Error fetching cards:', error);
        }
    };


    // delete card


    const deleteUser = async (id) => {
        try {
            const result = await fetch(`http://localhost:5000/admin/newcard/delete/${id}`, {
                method: 'DELETE',
            });
            if (result.ok) {
                getCards(); 
            }
        } catch (error) {
            console.log('Error deleting :', error);
        }
    };

    useEffect(() => {
        getCards();
    }, [loading]);

    if(loading) return <Load/>

  return (
    <>
       <div className="users-data">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serv.map((cur, index) => {
                          
                           return <tr key={index}>
                                <td>{cur.title}</td>
                                <td>{cur.description}</td>
                                <td><Link to={`/admin/servicecard/${cur._id}/editcard`}><MdEdit className='edibtn'/></Link></td>
                                <td><MdDelete className='delbtn' onClick={() => deleteUser(cur._id)} /></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                    <Link to='/admin/addnewcard'><IoIosAddCircleOutline id='newcd' /></Link>
            </div>
    </>
  )
}
