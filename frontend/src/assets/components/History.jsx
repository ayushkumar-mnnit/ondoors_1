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

import { useAuth } from "../context/ContextAPI.jsx";

// import { useAuth } from "../context/ContextAPI"

const History = () => {
  const { bookingData } = useAuth();

  // const [status, setStatus] = useState('pending')

  return (
    <Box className="service-provider-container" mt={6}>
      <TableContainer mt={6} ml={2} mr={2}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Service Provider</Th>
              <Th>Address</Th>
              <Th>Service Type</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookingData && bookingData.length > 0 ? (
              bookingData.map((booking, index) => (
                <Tr key={index}>
                  <Td>{booking.spName}</Td>
                  <Td>{booking.spAddress}</Td>
                  <Td>{booking.bookingFor}</Td>
                  <Td></Td>
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
