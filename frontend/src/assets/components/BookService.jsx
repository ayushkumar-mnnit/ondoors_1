import { useToast, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CiBookmarkPlus } from "react-icons/ci"
import { useAuth } from "../context/ContextAPI"


const BookService = () => {
  const toast = useToast()
  const [sp, setSp] = useState([])
  const { title } = useParams()
  const { user } = useAuth()
  


  useEffect(() => {

    getAllUsers()
    
  }, [])

  const getAllUsers = async () => {
    try {
      const result = await axios.get('/api/admin/allUsers')
      if (result.data.success) {
        setSp(result.data.data)
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || 'Server is down',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const handleBook = async (provider) => {
    const userDetails = {
      client: user._id, 
      clientName: user.name,
      bookingFor: provider.serviceType,
      address: user.address,
      pin: user.pincode,
      mobile: user.mobile,
      serviceProvider: provider._id,  
      spName: provider.name,
      spAddress: provider.address
    }

    
    try {
        const response = await axios.post('/api/bookings', userDetails)
        
        if (response.data.success) {
          toast({
              title: 'Booking successful',
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top',
          })
        
      } 
      else {
            toast({
              title: 'Booking failed',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top',
          })
     }
    } catch (error) {
          toast({
            title: error.response?.data?.message || 'some error occured while booking',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top',
        })
    }
}



  const filteredSP = sp.filter(provider => provider.serviceType === title)



  return (
    <Box className="service-provider-container" mt={6}>
      <h4 style={{ textAlign: "center" ,fontFamily:'monospace'}}>
        Available Service Providers as <span style={{ color: "purple" }}>{title}</span> 
      </h4>
      {filteredSP.length === 0 ? (
        <Text color="orangered" textAlign="center">
          Oops! Looks like no service provider found for this service.
        </Text>
      ) : (
        <TableContainer mt={6} ml={2} mr={2}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Address</Th>
                <Th>Pin code</Th>
                <Th>Book</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredSP.map((provider, index) => (
                <Tr key={index}>
                  <Td>{provider.name}</Td>
                  <Td>{provider.email}</Td>
                  <Td>{provider.address}</Td>
                  <Td>{provider.pincode}</Td>
                  <Td>
                    <Box
                      as="span"
                      _hover={{ color: "blue", cursor: "pointer" }}
                      onClick={() => handleBook(provider)} >
                      <CiBookmarkPlus size={25} />
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default BookService
