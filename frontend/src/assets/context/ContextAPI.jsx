/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState, createContext, useContext } from 'react'


export const AuthContext = createContext()

const api = 'https://ondoors-1.onrender.com' // hosted backend url

export const AuthProvider = ({ children }) => {

const [loading, setLoading] = useState(true)
const [toggle, setToggle] = useState(false)

const handleToggle = () => {
  setToggle(!toggle)
}

  const [card, setCard] = useState([])
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    mobile: '',
    pincode: '',
    role: '',
    serviceType: '',
    isAdmin: false,
  })

  // State to manage token
  const [token, setToken] = useState(localStorage.getItem('token') || '') // Initialize token from localStorage

  // Function to fetch current user
  const getCurUser = async () => {
    if (!token) return // Exit if there's no token
    try {
      const result = await axios.get(`${api}/userData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      if (result.data.success) {
        setUser(result.data.data)
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down')
    } 
  }



   // Function to fetch cards
   // Function to fetch cards
   const getCards = async () => {
    // if (!token) return // Prevent fetching cards if token is not available
     try {
       const result = await axios.get(`${api}/getcards`, {
         headers: {
           'Authorization': `Bearer ${token}`,
         },
         withCredentials: true,
       })
       if (result.data.success) {
         setCard(result.data.data)
        
       } else {
         console.log('Failed to fetch cards:', result.data.message)
       }
     } catch (error) {
       console.log(error.response?.data?.message || 'Server is down')
     }
     finally{
       setLoading(false)
     } 
   }


 
   useEffect(() => {
     getCurUser()
   }, [token]) 
 
   useEffect(() => {
     getCards()
   }, [])


  return (
    <AuthContext.Provider value={{ user, card, setToken,loading,toggle,handleToggle }}>
      {children}
    </AuthContext.Provider>
  )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext)
}
