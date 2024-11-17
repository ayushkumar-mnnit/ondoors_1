import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/ContextAPI.jsx";

const api='https://ondoors-1.onrender.com';  // hosted backend url

const AdminContacts = () => {
  const [contact, setContact] = useState([]);
  const { token } = useAuth();

  const getAdminContacts = async () => {
    try {
      const result = await axios.get(`${api}/admin/getAdminContacts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });

      if (result.data.success) {
        setContact(result.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    }
  };

  useEffect(() => {
    getAdminContacts();
  }, []);

  return (
    <div className="container table-responsive py-5">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {contact.map((item,index) => (
            <tr key={item._id}>
              <td>{index+1}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContacts;
