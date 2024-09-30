import {
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { CiBookmarkPlus } from "react-icons/ci";
import { useAuth } from "../context/ContextAPI";

const BookService = () => {
  const toast = useToast();
  const [sp, setSp] = useState([]);
  const { title } = useParams(); 
  const { user } = useAuth();
  
  const getAllUsers = async () => {
    try {
      const result = await axios.get('/api/admin/allUsers');
      if (result.data.success) {
        setSp(result.data.data);
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || 'Server is down',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Filter service providers based on the selected serviceType (title)
  const filteredSP = sp.filter(provider => provider.serviceType === title);

  // Function to handle booking request and send email
  const handleBook = (provider) => {
    const userDetails = {
      name: user.name,  
      email: user.email,
      address: user.address,
      mobile: user.mobile,
      pin: user.pincode
    };

    const mailtoLink = `mailto:${provider.email}?subject=Booking Request&body=Name: ${userDetails.name}%0AEmail: ${userDetails.email}%0AAddress: ${userDetails.address}%0AMobile: ${userDetails.mobile}%0APin: ${userDetails.pin}`;

    // Open the user's email client
    window.location.href = mailtoLink;
  };

  return (
    <Box className="service-provider-container" mt={6}>
      <Heading as="h2" size="lg" textAlign="center" fontFamily="'Math', sans-serif" mb={4}>
        Available Service Providers for {title}
      </Heading>

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
                      onClick={() => handleBook(provider)}
                    >
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
  );
};

export default BookService;
