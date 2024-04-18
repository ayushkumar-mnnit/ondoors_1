import React, { useEffect, useState } from 'react'
import './serv.css'
import { useAuth } from '../../jwt_Store/jwtStorage'
import axios from 'axios'

export const ServiceForm = () => {

    const { user, authToken } = useAuth()
    const [loading, setLoading] = useState(true)
    const [sp, setsp] = useState([])
    const [ar, setAr] = useState([])
    const [firstUserName, setFirstUserName] = useState(
        {
            sp1:'',
            sp2:'',
            sp3:''
        }
    )

    const [client, setclient] = useState({
        clati: 0,
        clongi: 0
    })

    const address = user.address

    const API_KEY = '661e8f448eef6632201733fxn293651'
    const ApiEndPoint = 'https://geocode.maps.co/search'

    const geo = async (customAddress) => {
        try {
            const response = await axios.get(`${ApiEndPoint}?q=${customAddress}&api_key=${API_KEY}`)

            if (response.data.length != 0) {
                const lati = response.data[0].lat
                const longi = response.data[0].lon
                return { lati, longi }
            } else {
                return false
            }
        } catch (error) {
            console.error('geo error', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { lati, longi } = await geo(address)
                setclient({ clati: lati, clongi: longi })
            } catch (error) {
                console.error('Error fetching geo data:', error)
            }
        }

        fetchData()
    }, [loading])

    const getServiceProvider = async () => {
        try {
            const result = await fetch('http://localhost:5000/admin/allusers', {
                method: 'GET',
                headers: {
                    Authorization: authToken
                }
            })

            if (result.ok) {
                const data = await result.json()
                setsp(data.result)
                setLoading(false)
            } else {
                console.log('error occured')
            }
        } catch (error) {
            console.log('error fetching service providers', error.message)
        }
    }

    useEffect(() => {
        getServiceProvider()
    }, [loading])

    if (loading) return <h6>loading</h6>

    let lat1 = client.clati
    let lon1 = client.clongi

    function dist(lat2, lon2) {
        const r = 6371 // km
        const p = Math.PI / 180

        const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
            + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
            (1 - Math.cos((lon2 - lon1) * p)) / 2

        return 2 * r * Math.asin(Math.sqrt(a))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let temp = []
            for (let i = 0 ;i < sp.length; i++) {
               
    
                try {
                    const { lati, longi } = await geo(sp[i].address)
                    const distance = dist(lati, longi, "K")
                    temp.push({
                        name: sp[i].name,
                        email: sp[i].email,
                        address: sp[i].address,
                        role: sp[i].role,
                        isAdmin: sp[i].isAdmin,
                        distance
                    }) 
                } catch (error) {
                    console.error('Error fetching geo data:', error)
                    temp.push(null)
                }
            }
    
            // Sort temp in ascending order
            temp.sort((a, b) => a.distance - b.distance)
    
            setAr(temp) // Update ar array with sorted temp
           
         
            if (temp.length > 0) {
                setFirstUserName({
                    sp1:temp[1].name,
                    sp2:temp[2].name,
                    sp3:temp[3].name
                })
            }
        } catch (error) {
            console.log('error getting service provider:', error)
        }
    }
    console.log(ar)
    
    

    return (
        <>
            <div className="edit-profile-container">
                <div className="edit-profile">
                    <h6>Get the services as per your convenience</h6><br />
                    <form onSubmit={handleSubmit}>
                        <div className="edit-field">
                            <div className="edit-field-pro dim">
                                <label htmlFor="edit-name">Name:</label>
                                <input type="text" id="edit-name" name="name" value={user ? user.name : ''} readOnly />
                            </div>
                            <div className="edit-field-pro dim">
                                <label htmlFor="edit-email">Email:</label>
                                <input type="email" id="edit-email" name="email" value={user ? user.email : ''} readOnly />
                            </div>
                            <div className="edit-field-pro dim">
                                <label htmlFor="edit-address">Address:</label>
                                <input type="text" id="edit-address" name="address" value={user ? user.address : ''} readOnly />
                            </div>
                        </div>
                        <button className='btn' >Find the Service Provider</button>
                    </form>
                    <h2>{firstUserName.sp1}</h2> 
                    <h2>{firstUserName.sp2}</h2> 
                    <h2>{firstUserName.sp3}</h2> 
                </div>
            </div>
        </>
    )
}
