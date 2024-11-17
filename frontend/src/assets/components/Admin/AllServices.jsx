import { useToast, useDisclosure } from "@chakra-ui/react"; // Ensure to import useDisclosure
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text,
  IconButton,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../../context/ContextAPI.jsx";

const api='https://ondoors-1.onrender.com'  // hosted backend url

const AllServices = () => {
  const toast = useToast();
  const [card, setCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { token } = useAuth();    

  const getAllServices = async () => {
    try {
      const result = await axios.get(`${api}/getcards` , {
        headers: {
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
      });
      if (result.data.success) {
        setCard(result.data.data);
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Server is down');
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const handleEdit = (id) => {
    const cardToEdit = card.find((item) => item._id === id);
    setSelectedCard(cardToEdit);
    setCardTitle(cardToEdit.title);
    setCardDescription(cardToEdit.description);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`${api}/admin/delete/${id}` , {
        headers: {
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
      });
      if (result.data.success) {
        toast({
          title: "Card deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getAllServices(); // Refresh the card list after deletion
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Failed to delete card",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleAddNewCard = () => {
    setSelectedCard(null); // Reset for new card
    setCardTitle("");
    setCardDescription("");
    onOpen();
  };

  const handleSaveCard = async () => {
    try {
      if (selectedCard) {
        // Update existing card
        const result = await axios.patch(`${api}/admin/update/${selectedCard._id}`, {
          title: cardTitle,
          description: cardDescription,
        } , {
          headers: {
            'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
          },withCredentials: true
        });
        if (result.data.success) {
          toast({
            title: "Card updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      } else {
        // Add new card
        const result = await axios.post(`${api}/admin/newcard`, {
          title: cardTitle,
          description: cardDescription,
        },{
          headers: {
            'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
          },withCredentials: true
        });
        if (result.data.success) {
          toast({
            title: "New card added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      }
      getAllServices(); // Refresh the card list
      onClose(); // Close the modal
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Failed to save card",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      {/* Button to add a new card */}
      <Flex justifyContent="flex-end" p={4}>
        <Button colorScheme="teal" onClick={handleAddNewCard}>
          Add New Card
        </Button>
      </Flex>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        p={4}
      >
        {card.map((item, index) => (
          <GridItem key={index}>
            <Card
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              boxShadow="lg"
              p={4}
              borderRadius="md"
              minHeight="350px"  // Increased minimum height to incorporate all icons
              width="auto"        // Allow width to vary based on content
            >
              <CardHeader>
                <Heading size="md">{item.title}</Heading>
              </CardHeader>
              <CardBody flexGrow={1}>
                <Text>{item.description}</Text>
              </CardBody>
              <CardFooter justifyContent="space-between" display="flex">
                {/* Edit Icon */}
                <IconButton
                  icon={<FaEdit />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => handleEdit(item._id)}
                  aria-label="Edit"
                />
                {/* Delete Icon */}
                <IconButton
                  icon={<RiDeleteBin2Fill />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleDelete(item._id)}
                  aria-label="Delete"
                />
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>

      {/* Modal for adding/editing cards */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCard ? "Edit Card" : "Add New Card"}</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Card Title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              mb={4}
            />
            <Textarea
              placeholder="Card Description"
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
              size="lg" // Increase the size for better visibility
              minHeight="150px" // Set a minimum height
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveCard}>
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

export default AllServices;
