import {
  useToast,
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/ContextAPI";

const api = 'https://ondoors-1.onrender.com'; // hosted backend url

const BookService = () => {
  const toast = useToast();
  const [sp, setSp] = useState([]);
  const { title } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { token } = useAuth();

  const getAllUsers = async () => {
    try {
      const result = await axios.get(`${api}/admin/allUsers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (result.data.success) {
        setSp(result.data.data);
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Server is down",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleBook = async (provider) => {
    const userDetails = {
      clientID: user._id,
      clientName: user.name,
      bookingFor: provider.serviceType,
      address: user.address,
      pin: user.pincode,
      mobile: user.mobile,
      spID: provider._id,
      spName: provider.name,
      spAddress: provider.address,
    };

    try {
      const response = await axios.post(`${api}/bookings`, userDetails, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast({
          title: "Booking successful",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Booking failed",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "some error occured while booking",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const filteredSP = sp.filter((provider) => provider.serviceType === title);

  return (
    <Box className="service-provider-container" mt={6}>
      <Link to='/landing'><Button variant='ghost' ml={2} bg='green.100' _hover={{bg:'blue.100'}}>Back</Button></Link>
      <h4 style={{ textAlign: "center", fontFamily: "monospace" }}>
        Available Service Providers as <span style={{ color: "purple" }}>{title}</span>
      </h4>
      {filteredSP.length === 0 ? (
        <Text color="orangered" textAlign="center">
          Oops! Looks like no service provider found for this service.
        </Text>
      ) : (
        <VStack mt={6} ml={2} mr={2} spacing={4} align="stretch">
          {filteredSP.map((provider, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              style={{boxShadow: '1px 4px 5px gray'}}
            >
              <HStack justifyContent="space-between">
                <Box >
                  <Text fontWeight="bold">{provider.name}</Text>
                  <Text>Email: {provider.email}</Text>
                  <Text>Address: {provider.address}</Text>
                  <Text>Pin code: {provider.pincode}</Text>
                </Box>
                <Box
                  as="span"
                  _hover={{ color: "blue", cursor: "pointer" }}
                  onClick={() => handleBook(provider)}
                >
                  <Button bg='green.100' _hover={{bg:'blue.100'}} >Book now</Button>
                </Box>
              </HStack>
              <Divider mt={2} />
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default BookService;
