/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading,setLoading]=useState(true)

  const [card, setCard] = useState([]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    mobile: '',
    pincode: '',
    role: '',
    serviceType: '',
    isAdmin: false,
  });

  const getCurUser = async () => {
    console.log('before token');
    

    try {
      const result = await axios.get(`/api/userData`);
      if (result.data.success) {
        setUser(result.data.data);
      } else {
        console.log('Failed to fetch user data:', result.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    } 
    finally{
      setLoading(false)
    }
    
  };


    // const token=localStorage.getItem('token')

  useEffect(() => {
    getCurUser();
  }, []); 

  
  


  const getCards = async () => {
    try {
      const result = await axios.get(`/api/getcards`);
      console.log(result.data.data);
      if (result.data.success) {
        setCard(result.data.data);
      } else {
        console.log('Failed to fetch cards:', result.data.message);
      }
      
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getCards();

  }, []);

  return (
    <AuthContext.Provider value={{ user,card,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
