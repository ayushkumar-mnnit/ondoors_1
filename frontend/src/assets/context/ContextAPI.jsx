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


  const [bookingData, setBookingData] = useState([{
    client: "",
    clientName: "",
    bookingFor: "",
    address: "",
    pin: "",
    mobile: "",
    serviceProvider: "",
    spName: "",
    spAddress: "",
}]);



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



  const fetchBookingDetails = async () => {
    try {
        const result = await axios.get('/api/fetchBookings'); 
        if (result.data.success) {
            const bookingDetails = result.data.data; // This should be an array of booking objects

            // Assuming you want to set all booking details in state as an array
            setBookingData(bookingDetails.map(booking => ({
                client: booking.client || "",
                clientName: booking.clientName || "",
                bookingFor: booking.bookingFor || "",
                address: booking.address || "",
                pin: booking.pin || "",
                mobile: booking.mobile || "",
                serviceProvider: booking.serviceProvider || "",
                spName: booking.spName || "",
                spAddress: booking.spAddress || "",
            })));
        }
    } catch (error) {
        console.log(error.response?.data?.message || 'Server is down');
    }
};


  useEffect(() => {
    fetchBookingDetails();
  }, []);


 
  


  return (
    <AuthContext.Provider value={{ user,card,loading,bookingData }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
