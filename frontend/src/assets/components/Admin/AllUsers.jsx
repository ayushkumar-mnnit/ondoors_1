import { useToast, Select, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/ContextAPI";

const api = 'https://ondoors-1.onrender.com';  // hosted backend url

const AllUsers = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const { token } = useAuth();

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const result = await axios.get(`${api}/admin/allUsers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });
      if (result.data.success) {
        setUser(result.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Open the edit modal for updating admin role
  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    onOpen();
  };

  // Save the edited role (admin/user) using the provided route
  const handleSaveEdit = async () => {
    try {
      const isAdmin = newRole === "Admin" ? true : false;
      const result = await axios.patch(`${api}/admin/allUsers/changeAdmin/${selectedUser._id}`, { isAdmin }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });

      if (result.data.success) {
        toast({
          title: "User role updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
        getAllUsers(); // Refresh the user list
        onClose(); // Close the modal
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Failed to update role",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Delete the user using the provided route
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`${api}/admin/allUsers/deleteUser/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });
      if (result.data.success) {
        toast({
          title: "User deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        getAllUsers(); // Refresh the user list after deletion
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Failed to delete user",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <div className="container table-responsive py-5">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Role</th>
              <th scope="col">Admin</th>
              <th scope="col">Pin</th>
              <th scope="col">Address</th>
              <th scope="col">Service Type</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr key={item._id}>
                <td scope="row">{index + 1}</td>
                <td>{item.name.split(' ')[0]}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.role[0]}</td>
                <td>
                  {item.isAdmin ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <MdVerifiedUser style={{ marginRight: '5px', color: 'green' }} /> Yes
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <FaUserCircle style={{ marginRight: '5px', color: 'blue' }} /> No
                    </span>
                  )}
                </td>
                <td>{item.pincode}</td>
                <td>{item.address}</td>
                <td>{item.serviceType ? item.serviceType.split(' ')[0] : 'N/A'}</td>
                <td>
                  <FaEdit className="edbtn" color="blue" onClick={() => handleEdit(item)} aria-label="Edit" />
                </td>
                <td>
                  <RiDeleteBin2Fill className="edbtn" color="red" onClick={() => handleDelete(item._id)} aria-label="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Role Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Role</ModalHeader>
          <ModalBody>
            <Select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllUsers;
