
import { useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  const [contact, setContact] = useState([]);

  const getAdminContacts = async () => {
    try {
      const result = await axios.get(`/api/admin/getAdminContacts`);
     

      if (result.data.success) {
        setContact(result.data.data);
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Server is down",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
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
