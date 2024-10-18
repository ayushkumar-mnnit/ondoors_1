import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, ButtonGroup, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState} from "react";
import { useAuth } from "../context/ContextAPI";

const api='https://ondoors-1.onrender.com'  // hosted backend url

const Notif = () => {
  const [notificationData, setNotificationData] = useState([]); 
  
const { token } = useAuth();
  
  const fetchServiceProviderNotifications = async () => {
    try {
      const result = await axios.get(`${api}/fetchNotifications` , {
        headers: {
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
      });
      if (result.data.success) {
        const notif = result.data.notifications;
        setNotificationData(notif);
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    }
  };

  
  useEffect(() => {
    fetchServiceProviderNotifications();
  }, []); 

  // Polling to check for new notifications periodically (every 1 seconds)- better to use websocket
  useEffect(() => {
    const interval = setInterval(() => {
      fetchServiceProviderNotifications();
    },1000); 

    return () => clearInterval(interval); 
  }, []);

  // Handle status update (accept/reject) and re-fetch data
  const handleAccept = async (bookingID) => {
    try {
      await axios.patch(`${api}/updateStatus/${bookingID}`, 
        { status: 'Accepted' }, 
        {  headers: {
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },withCredentials: true }
      );
      console.log('Booking accepted successfully');
      
      fetchServiceProviderNotifications(); // Trigger re-fetch after status update
    } catch (error) {
      console.error('Error accepting booking:', error.response?.data?.message || error.message);
    }
  };

  const handleReject = async (bookingID) => {
    try {
      await axios.post(`${api}/updateStatus/${bookingID}`, 
        { status: 'Rejected' }, 
        { headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
        },withCredentials: true } 
      );
      console.log('Booking rejected successfully');

      fetchServiceProviderNotifications(); 
    } catch (error) {
      console.error('Error rejecting booking:', error.response?.data?.message || error.message);
    }
  };

  return (
    <Box className="service-provider-container" mt={6}>
      <TableContainer mt={6} ml={2} mr={2}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Client</Th>
              <Th>Booking for</Th>
              <Th>Booked on</Th>
              <Th>Address</Th>
              <Th>Pin code</Th>
              <Th>Ph.No.</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notificationData && notificationData.length > 0 ? (
              notificationData.map((notification, index) => (
                <Tr key={index}>
                  <Td>{notification.clientName}</Td>
                  <Td>{notification.bookingFor}</Td>
                  <Td>{notification.bookingDate.slice(0, 10)}</Td>
                  <Td>{notification.address}</Td>
                  <Td>{notification.pin}</Td>
                  <Td>{notification.mobile}</Td>

                  <Td>
                    {notification.bookingStatus === 'Pending' ? (
                      <ButtonGroup>
                        <Button 
                          bg="green" 
                          colorScheme="white" 
                          onClick={() => handleAccept(notification.bookingID)} 
                          _hover={{ cursor: 'pointer' }}
                        >
                          Accept
                        </Button>
                        <Button 
                          bg="red.500" 
                          colorScheme="white" 
                          onClick={() => handleReject(notification.bookingID)} 
                          _hover={{ cursor: 'pointer' }}
                        >
                          Reject
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <Box 
                        borderRadius="20px" 
                        p={1.5} 
                        bg={notification.bookingStatus === 'Accepted' ? 'green.200' : 'red.200'}
                        color={notification.bookingStatus === 'Accepted' ? 'green' : 'red'} 
                        textAlign="center"
                      >
                        {notification.bookingStatus}
                      </Box>
                    )}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center">---No booking request available---</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Notif;
