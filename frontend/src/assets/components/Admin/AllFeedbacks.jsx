import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/ContextAPI";

const api='https://ondoors-1.onrender.com';  // hosted backend url

const AllFeedbacks = () => {
  const [feed, setfeed] = useState([]);
  const { token } = useAuth();  

  const getAllFeedbacks = async () => {
    try {
      const result = await axios.get(`${api}/admin/allFeedbacks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });

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
    <div className="container table-responsive py-5">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Feedbacks</th>
          </tr>
        </thead>
        <tbody>
          {feed.map((item,index) => (
           
            <tr key={item._id}>
            <td>{index+1}</td>
              <td>{item.feedbackMsg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllFeedbacks;
