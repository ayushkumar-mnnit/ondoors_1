import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/ContextAPI";

const api='https://ondoors-frontend.onrender.com'  // hosted backend url

const History = () => {
  
  const { token } = useAuth();

  const [bookingData, setBookingData] = useState([{
    bookingID: "",
    clientID: "",
    clientName: "",
    bookingFor: "",
    address: "",
    pin: "",
    mobile: "",
    spID: "",
    spName: "",
    spAddress: "",
    bookingDate: "",
    bookingStatus: "",
  }])

  const fetchBookingDetails = async () => {
    try {
      const result = await axios.get(`${api}/fetchBookings` , {
        headers: {
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
      })
      if (result.data.success) {
        setBookingData(result.data.data.map(booking => ({
          bookingID: booking._id || "",
          clientID: booking.clientID || "",
          clientName: booking.clientName || "",
          bookingFor: booking.bookingFor || "",
          address: booking.address || "",
          pin: booking.pin || "",
          mobile: booking.mobile || "",
          spID: booking.spID || "",
          spName: booking.spName || "",
          spAddress: booking.spAddress || "",
          bookingDate: booking.bookingDate || "",
          bookingStatus: booking.bookingStatus || "pending",
        })))
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down')
    }
  }
  

  useEffect(() => {
    fetchBookingDetails()
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      fetchBookingDetails()
    },1000); 

    return () => clearInterval(interval); 
  }, []);


  return (
    <Box className="service-provider-container" mt={6}>
      <TableContainer mt={6} ml={2} mr={2}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Service Provider</Th>
              <Th>Address</Th>
              <Th>Booking for</Th>
              <Th>Booking Status</Th>
              <Th>Booked on</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookingData && bookingData.length > 0 ? (
              bookingData.map((booking, index) => (
                <Tr key={index}>
                  <Td>{booking.spName}</Td>
                  <Td>{booking.spAddress}</Td>
                  <Td>{booking.bookingFor}</Td>
                  <Td> {booking.bookingStatus==='Pending'?
                  
                    ( <Box 
                        borderRadius="20px" 
                        p={1.5} 
                        bg='blue.200'
                        color='blue'
                        textAlign="center" 
                      >
                     {booking.bookingStatus}
                      </Box>)
                  
                     :( <Box 
                        borderRadius="20px" 
                        p={1.5} 
                        bg={booking.bookingStatus === 'Accepted' ? 'green.200' : 'red.200'}
                        color={booking.bookingStatus === 'Accepted' ? 'green' : 'red'} 
                        textAlign="center" 
                      >
                        {booking.bookingStatus}
                      </Box>)

                  }
                  </Td>
                  <Td>{booking.bookingDate.slice(0, 10)}</Td>
                  
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  ---No Bookings so far---
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default History;
