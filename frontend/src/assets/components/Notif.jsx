import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, ButtonGroup, Button } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"


const Notif = () => {
  const [notificationData, setNotificationData] = useState([]) // Start with an empty array

  const fetchServiceProviderNotifications = async () => {
    try {
      const result = await axios.get(`/api/fetchNotifications`)
      if (result.data.success) {
        const notif = result.data.notifications
     
        
        setNotificationData(notif) // Use setNotificationData to store fetched notifications
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down')
    }
  }

  useEffect(() => {
    fetchServiceProviderNotifications()
  }, [])

  const handleAccept = () => {
    // Implement accept logic using notificationId
  }

  const handleReject = () => {
    // Implement reject logic using notificationId
  }

  return (
    <Box className="service-provider-container" mt={6}>
      <TableContainer mt={6} ml={2} mr={2}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Client</Th>
              <Th>Booking for</Th>
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
                  <Td>{notification.address}</Td>
                  <Td>{notification.pin}</Td>
                  <Td>{notification.mobile}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button 
                        bg="green" 
                        colorScheme="white" 
                        onClick={() => handleAccept(notification._id)} 
                        _hover={{ cursor: 'pointer' }}
                      >
                        Accept
                      </Button>
                      <Button 
                        bg="red.500" 
                        colorScheme="white" 
                        onClick={() => handleReject(notification._id)} 
                        _hover={{ cursor: 'pointer' }}
                      >
                        Reject
                      </Button>
                    </ButtonGroup>
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
  )
}

export default Notif
