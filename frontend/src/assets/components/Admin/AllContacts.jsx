
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useAuth } from "../../context/ContextAPI";


const api='https://ondoors-1.onrender.com'  // hosted backend url

const AllContacts = () => {

  const [contact, setContact] = useState([]);
  const { token } = useAuth();

  const getAllContacts = async () => {
    try {
      const result = await axios.get(`${api}/admin/allContacts` , {
        headers: {
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
      });
      console.log(result.data.data);

      if (result.data.success) {
        setContact(result.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    }
  };

  useEffect(() => {
    getAllContacts();
 
  }, []);

  return (
    <TableContainer mt='2%'>
      <Table variant="unstyled" color="cyan.100">
        <Thead  >
          <Tr >
            <Th color='lightgreen'>Name</Th>
            <Th color='lightgreen'>Email</Th>
            <Th color='lightgreen'>Message</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contact.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>{item.message}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AllContacts;
