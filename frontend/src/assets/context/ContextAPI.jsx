/* eslint-disable react-refresh/only-export-components */
import axios from 'axios'
import { useEffect, useState, createContext, useContext } from 'react'

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {


  const [userLoding,setUserLoading]=useState(true)
  const [cardLoding,setCardLoading]=useState(true)

 

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
 

  // Function to fetch current user
  const getCurUser = async () => {
    try {
      const result = await axios.get(`/api/userData`)
      if (result.data.success) {
        setUser(result.data.data)
      } else {
        console.log('Failed to fetch user data:', result.data.message)
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down')
    }finally{
      setUserLoading(false)
    }
  }

  // Function to fetch cards
  const getCards = async () => {
    try {
      const result = await axios.get(`/api/getcards`)
      if (result.data.success) {
        setCard(result.data.data)
      } else {
        console.log('Failed to fetch cards:', result.data.message)
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down')
    } finally{
      setCardLoading(false)
    }
  }

  // Function to fetch booking details
 

  useEffect(() => {
    getCurUser()
  }, [])

  useEffect(() => {
    getCards()
  }, [])




  return (
    <AuthContext.Provider value={{user,card,userLoding,cardLoding}}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for easy use of AuthContext
export const useAuth = () => {
  return useContext(AuthContext)
}
