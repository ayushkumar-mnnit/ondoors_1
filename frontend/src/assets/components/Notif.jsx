import { Box, ButtonGroup, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/ContextAPI.jsx";

const api = "https://ondoors-1.onrender.com"; // hosted backend URL

const Notif = () => {
  const [notificationData, setNotificationData] = useState([]);

  const { token } = useAuth();

  const fetchServiceProviderNotifications = async () => {
    try {
      const result = await axios.get(`${api}/fetchNotifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (result.data.success) {
        const notif = result.data.notifications;
        setNotificationData(notif);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Server is down");
    }
  };

  useEffect(() => {
    fetchServiceProviderNotifications();
  }, []);

  // Polling for new notifications periodically (every 1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchServiceProviderNotifications();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (bookingID) => {
    try {
      await axios.patch(
        `${api}/updateStatus/${bookingID}`,
        {
          status: "Accepted",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Booking accepted successfully");
      fetchServiceProviderNotifications();
    } catch (error) {
      console.error(
        "Error accepting booking:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleReject = async (bookingID) => {
    try {
      await axios.patch(
        `${api}/updateStatus/${bookingID}`,
        {
          status: "Rejected",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Booking rejected successfully");
      fetchServiceProviderNotifications();
    } catch (error) {
      console.error(
        "Error rejecting booking:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <Box className="service-provider-container" mt={6}>
      <h6 className="text-center" style={{ color: "navy" }}>
        Service requests
      </h6>
      <div className="container table-responsive py-5">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Client</th>
              <th scope="col">Booking for</th>
              <th scope="col">Booked on</th>
              <th scope="col">Address</th>
              <th scope="col">Pin code</th>
              <th scope="col">Ph.No.</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {notificationData && notificationData.length > 0 ? (
              notificationData.map((notification, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{notification.clientName}</td>
                  <td>{notification.bookingFor}</td>
                  <td>{notification.bookingDate.slice(0, 10)}</td>
                  <td>{notification.address}</td>
                  <td>{notification.pin}</td>
                  <td>
                    {notification.bookingStatus === "Accepted"
                      ? notification.mobile
                      : "N/A"}
                  </td>
                  <td>
                    {notification.bookingStatus === "Pending" ? (
                      <ButtonGroup>
                        <Button
                          bg="green"
                          colorScheme="white"
                          onClick={() => handleAccept(notification.bookingID)}
                          _hover={{ cursor: "pointer" }}
                        >
                          Accept
                        </Button>
                        <Button
                          bg="red.500"
                          colorScheme="white"
                          onClick={() => handleReject(notification.bookingID)}
                          _hover={{ cursor: "pointer" }}
                        >
                          Reject
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <Box
                        borderRadius="20px"
                        p={1.5}
                        bg={
                          notification.bookingStatus === "Accepted"
                            ? "green.200"
                            : "red.200"
                        }
                        color={
                          notification.bookingStatus === "Accepted"
                            ? "green"
                            : "red"
                        }
                        textAlign="center"
                      >
                        {notification.bookingStatus}
                      </Box>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  ---No booking request available---
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default Notif;