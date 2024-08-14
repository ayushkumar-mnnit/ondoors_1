import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

export const EditCard = () => {

    const navigate = useNavigate()
    const params = useParams()
    const [loading, setLoading] = useState(true)


    const [scard, setScard] = useState({
        title: '',
        description: ''
    })


    const getCardById = async () => {
        try {
            const result = await fetch(`http://localhost:5000/admin/newcard/getcard/${params.id}`, {
                method: 'GET',
            });
            const rest = await result.json();
            setScard(rest.data);
            if (rest) {
                setLoading(false);
            }
        } catch (error) {
            console.log('Error fetching user:', error);
        }
    };

    useEffect(() => {
        getCardById();
    }, [loading]);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const result = await fetch(`http://localhost:5000/admin/newcard/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scard)
            })

            if (result.ok) {
                toast.success('updated successfully')
                navigate('/admin/servicecard')
            } else {
                toast.error('some error occured while updating')
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setScard({ ...scard, [name]: value })
    }

    return (
        <>
            <div className='profile-container'>
                <div className='profile'>
                    <div className='profile-info'>
                        <form onSubmit={handleSubmit}>
                            <div className='field'>
                                <label className='lab'>Title</label>
                                <input type="text" className='c-name' size='20' name='title' onChange={handleChange} value={scard.title} />
                            </div>

                            <div className='field'>
                                <label className='lab'>Description</label>
                                <textarea className="msg" name="description" rows="5" cols="45" onChange={handleChange} value={scard.description}  ></textarea>
                            </div>
                            <div className='field'>
                                <button className='btn-rlog'>Save Changes</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
