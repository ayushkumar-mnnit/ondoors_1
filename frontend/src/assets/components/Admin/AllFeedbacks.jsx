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

const AllFeedbacks = () => {
  const toast = useToast();
  const [feed, setfeed] = useState([]);

  const getAllFeedbacks = async () => {
    try {
      const result = await axios.get(`/api/admin/allFeedbacks`);
      console.log(result.data.data);

      if (result.data.success) {
        setfeed(result.data.data);
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
    getAllFeedbacks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer mt='2%'>
      <Table variant="unstyled" color="cyan.100">
        <Thead  >
          <Tr >
            <Th color='lightgreen'>Feedbacks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {feed.map((item) => (
            <Tr key={item._id}>
              <Td>{item.feedbackMsg}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AllFeedbacks;
