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

const AllContacts = () => {
  const toast = useToast();
  const [contact, setContact] = useState([]);

  const getAllContacts = async () => {
    try {
      const result = await axios.get(`/api/admin/allContacts`);
      console.log(result.data.data);

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
    getAllContacts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
