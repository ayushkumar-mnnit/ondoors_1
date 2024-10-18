
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

const AllFeedbacks = () => {

  const [feed, setfeed] = useState([]);
  const { token } = useAuth();  

  const getAllFeedbacks = async () => {
    try {
      const result = await axios.get(`${api}/admin/allFeedbacks` , {
        headers: {
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
      });
      console.log(result.data.data);

      if (result.data.success) {
        setfeed(result.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  
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
