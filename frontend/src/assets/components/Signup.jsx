import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/login.css'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useAuth } from '../context/ContextAPI'

// eslint-disable-next-line react/prop-types
const Signup = ({toggleForm}) => {

    const navigate=useNavigate()
    const toast=useToast()

    const {card}=useAuth()

    const [showServiceType, setShowServiceType] = useState(false)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "",
        serviceType: "",
        pincode:''
    })

    const handleChange =(e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
        
        // Update showServiceType based on the selected role
        if (name === 'role') {
            setShowServiceType(value === 'Service Provider')
        }
    }


        const handleSubmit=async(e)=>{
            e.preventDefault()
            try {
                const result =await axios.post(`/api/register`,user,
                    {
                        headers:{
                            'Content-Type':'application/json',
                        }
                    }
                )

                if(result.data.success)
                {
                    toast({
                        title:result.data.message,
                        status:'success',
                        duration:4000,
                        isClosable:true,
                        position:'top'
                    })
                    setUser({
                        name: "",
                        email: "",
                        password: "",
                        address: "",
                        role: "",
                        serviceType: "",
                        pincode:''
                    })
                    navigate('/')
                }
            } catch (error) {
                const x=error.response.data.message
                toast({
                    title: x.length>45?x.split(':')[0]:x,
                    description:'some input field(s) is too short or too long' ,
                    status:x.length>45?'loading':'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
            }
            
        }

    return (
        <>
            <section className="py-3 py-md-5 py-xl-8" style={{ backgroundColor: 'rgb(20, 28, 37)' }}>
                <div className="container">
                    <div className="row gy-4 align-items-center">
                        <div className="col-12 col-md-6 col-xl-7 d-flex justify-content-center position-relative"> 
                            <img 
                                src="https://img.freepik.com/premium-photo/elegant-young-fashion-beautiful-girl-holding-bag-while-shopping-with-white-sexy-dress_226666-1786.jpg" 
                                alt="Fashion girl"
                                className="img-fluid blended-image" 
                                style={{
                                    maxWidth: '80%', 
                                    maxHeight: '100%', 
                                    objectFit: 'cover', 
                                    filter: 'blur(0)',  
                                    zIndex: '1',  
                                    borderRadius: '5px', 
                                }}
                            />
                            {/* Blurred background for blending effect */}
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                filter: 'blur(30px)',  
                                backgroundImage: 'url(https://img.freepik.com/premium-photo/elegant-young-fashion-beautiful-girl-holding-bag-while-shopping-with-white-sexy-dress_226666-1786.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                zIndex: '0',
                                borderRadius: '10px',
                            }}></div>
                        </div>

                        <div className="col-12 col-md-6 col-xl-5">
                            <div className="card border-0 rounded-4 shadow">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-4">
                                                <h3>Register</h3>
                                                <p>Already have an account? <button onClick={toggleForm}>Log In</button></p>
                                            </div>
                                        </div>
                                    </div>
                                    <form >
                                        <div className="row gy-3 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" onChange={handleChange} value={user.name} name="name" id="name" required />
                                                    <label className="form-label">Name</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="email" className="form-control" onChange={handleChange} value={user.email} name="email" id="email" required />
                                                    <label className="form-label">E-mail</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="password" className="form-control" onChange={handleChange} value={user.password} name="password" id="password" required />
                                                    <label className="form-label">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" onChange={handleChange} value={user.address} name="address" id="address" required />
                                                    <label className="form-label">Address</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" onChange={handleChange} value={user.pincode} name="pincode" id="address" required />
                                                    <label className="form-label">Pin code</label>
                                                </div>
                                            </div>
                                            
                                            {/* Role selection with radio buttons */}
                                            <div className="col-12">
                                                <div className="d-flex">
                                                    <div className="form-check me-3">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio" 
                                                            name="role" 
                                                            id="client" 
                                                            value="Client" 
                                                            onChange={handleChange} 
                                                            checked={user.role === 'Client'} 
                                                        />
                                                        <label className="form-check-label" htmlFor="client">Client</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio" 
                                                            name="role" 
                                                            id="serviceProvider" 
                                                            value="Service Provider" 
                                                            onChange={handleChange} 
                                                            checked={user.role === 'Service Provider'} 
                                                        />
                                                        <label className="form-check-label" htmlFor="serviceProvider">Service Provider</label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Conditionally rendered Service Type dropdown */}
                                            {showServiceType && (
                                                <div className="col-12">
                                                    <div className="form-floating mb-3">
                                                        <select className="form-select" id="serviceType" name="serviceType" onChange={handleChange} value={user.serviceType}>
                                                            <option value="">Select</option>
                                                            {card.map((item)=>(

                                                            <option key={item._id}>{item.title}</option>
                                                            ))}
                                                           
                                                        </select>
                                                        <label className="form-label" htmlFor="serviceType">Service Type</label>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button className="btn btn-primary btn-lg" type="submit" onClick={handleSubmit}>Register now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup