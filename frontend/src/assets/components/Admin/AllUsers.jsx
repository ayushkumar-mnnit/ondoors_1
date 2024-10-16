import { useToast, Select, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const AllUsers = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const result = await axios.get(`/api/admin/allUsers`);
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
      const result = await axios.patch(`/api/admin/allUsers/changeAdmin/${selectedUser._id}`, { isAdmin });

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
      const result = await axios.delete(`/api/admin/allUsers/deleteUser/${id}`);
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
      <TableContainer mt="2%">
        <Table variant="unstyled" color="cyan.100">
          <Thead>
            <Tr>
              <Th color="lightgreen">Name</Th>
              <Th color="lightgreen">Email</Th>
              <Th color="lightgreen">Phone</Th>
              <Th color="lightgreen">Role</Th>
              <Th color="lightgreen">Admin</Th>
              <Th color="lightgreen">Pin</Th>
              <Th color="lightgreen">Address</Th>
              <Th color="lightgreen">Service Type</Th>
              <Th color="lightgreen">Edit</Th>
              <Th color="lightgreen">Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user.map((item) => (
              <Tr key={item._id}>
                <Td>{item.name.split(' ')[0]}</Td>
                <Td>{item.email}</Td>
                <Td>{item.mobile}</Td>
                <Td>{item.role[0]}</Td>
                <Td>
                  {item.isAdmin ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <MdVerifiedUser style={{ marginRight: '5px', color: 'lightgreen' }} /> Yes
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <FaUserCircle style={{ marginRight: '5px', color: 'blue' }} /> No
                    </span>
                  )}
                </Td>
                <Td>{item.pincode}</Td>
                <Td>{item.address}</Td>
                <Td>{item.serviceType ? item.serviceType.split(' ')[0] : 'N/A'}</Td>
                <Td>
                  <FaEdit className="edbtn" color="white" onClick={() => handleEdit(item)} aria-label="Edit" />
                </Td>
                <Td>
                  <RiDeleteBin2Fill className="edbtn" color="red" onClick={() => handleDelete(item._id)} aria-label="Delete" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

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
