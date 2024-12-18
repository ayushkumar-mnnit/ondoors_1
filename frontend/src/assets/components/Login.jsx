/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import './css/login.css'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import authimg from '../images/auth.jpg'
import { useAuth } from '../context/ContextAPI.jsx'

const api = 'https://ondoors-1.onrender.com' // hosted backend url

const Login = ({ toggleForm }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const { setToken, toggle } = useAuth() // Get setToken from context
  const [user, setUser] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(`${api}/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (result.data.success) {
        const token = result.data.data
        setToken(token) // Set token using context

        localStorage.setItem('token', token)

        toast({
          description: result.data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        })
        setUser({ email: '', password: '' })
        navigate('/')
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || 'Server is down',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  return (
    <section className="py-3 py-md-5 py-xl-8">
      <div
        className="container"
        style={{
          backgroundColor: toggle ? '#0B192C' : 'white',
          color: toggle ? 'white' : 'black',
        }}
      >
        <div className="row gy-4 align-items-center">
          <div className="col-12 col-md-6 col-xl-7 d-flex justify-content-center position-relative">
            <img
              src={authimg}
              alt="auth"
              className="img-fluid blended-image"
              style={{
                maxWidth: '80%',
                maxHeight: '450px',
                objectFit: 'cover',
                borderRadius: '6px',
              }}
            />
          </div>

          <div className="col-12 col-md-6 col-xl-5">
            <div
              className="card border-0 rounded-2"
              style={{

                boxShadow:toggle ? '0.5px 0.5px 0.5px 0.5px white' : '1px 2px 2px 2px gray',
                backgroundColor: toggle ? '#0B192C' : 'white',
                color: toggle ? 'white' : 'black',
              }}
            >
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <h3  >Log in</h3>
                      <p>
                        Do not have an account?{' '}
                        <button onClick={toggleForm}>Sign Up</button>
                      </p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-3 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                      <p>Email</p>
                        <input
                          type="email"
                          className="form-control"
                          onChange={handleChange}
                          value={user.email}
                          name="email"
                          id="email"
                          required
                          style={{
                            backgroundColor: toggle ? '#0B192C' : 'white',
                            color: toggle ? 'white' : 'black',
                          }}
                        />
                       
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                    <p>Password</p>
                        <input
                          type="password"
                          className="form-control"
                          onChange={handleChange}
                          value={user.password}
                          name="password"
                          id="password"
                          required
                          style={{
                            backgroundColor: toggle ? '#0B192C' : 'white',
                            color: toggle ? 'white' : 'black',
                          }}
                        />
                       
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                          style={{ backgroundColor: toggle ? '#0B192C' : null }}
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
