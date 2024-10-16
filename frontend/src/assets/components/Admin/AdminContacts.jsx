
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

const AdminContacts = () => {
  
  const [contact, setContact] = useState([]);

  const getAdminContacts = async () => {
    try {
      const result = await axios.get(`/api/admin/getAdminContacts`);
     

      if (result.data.success) {
        setContact(result.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    }
  };

  useEffect(() => {
    getAdminContacts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer mt='2%'>
      <Table variant="unstyled" color="cyan.100">
        <Thead  >
          <Tr >
         
            <Th color='lightgreen'>User_name</Th>
            <Th color='lightgreen'>Message</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contact.map((item) => (
            <Tr key={item._id}>
              <Td>{item.email}</Td>
              <Td>{item.message}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AdminContacts;
