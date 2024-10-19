import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/ContextAPI";

const api = "https://ondoors-1.onrender.com"; // hosted backend url

const History = () => {
  const { token } = useAuth();

  const [bookingData, setBookingData] = useState([
    {
      bookingID: "",
      clientID: "",
      clientName: "",
      bookingFor: "",
      address: "",
      pin: "",
      mobile: "",
      spID: "",
      spName: "",
      spAddress: "",
      bookingDate: "",
      bookingStatus: "",
    },
  ]);

  const fetchBookingDetails = async () => {
    try {
      const result = await axios.get(`${api}/fetchBookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (result.data.success) {
        setBookingData(
          result.data.data.map((booking) => ({
            bookingID: booking._id || "",
            clientID: booking.clientID || "",
            clientName: booking.clientName || "",
            bookingFor: booking.bookingFor || "",
            address: booking.address || "",
            pin: booking.pin || "",
            mobile: booking.mobile || "",
            spID: booking.spID || "",
            spName: booking.spName || "",
            spAddress: booking.spAddress || "",
            bookingDate: booking.bookingDate || "",
            bookingStatus: booking.bookingStatus || "pending",
          }))
        );
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Server is down");
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBookingDetails();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="service-provider-container" mt={6}>
      <h6 className="text-center" style={{ color: "navy" }}>
        Service History
      </h6>
      <div className="container table-responsive py-5">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Service Provider</th>
              <th scope="col">Address</th>
              <th scope="col">Booking for</th>
              <th scope="col">Booked on</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingData && bookingData.length > 0 ? (
              bookingData.map((booking, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{booking.spName}</td>
                  <td>{booking.spAddress}</td>
                  <td>{booking.bookingFor}</td>
                  <td>{booking.bookingDate.slice(0, 10)}</td>
                  <td>
                    {booking.bookingStatus === "Pending" ? (
                      <Box
                        borderRadius="20px"
                        p={1.5}
                        bg="blue.200"
                        color="blue"
                        textAlign="center"
                      >
                        {booking.bookingStatus}
                      </Box>
                    ) : (
                      <Box
                        borderRadius="20px"
                        p={1.5}
                        bg={
                          booking.bookingStatus === "Accepted"
                            ? "green.200"
                            : "red.200"
                        }
                        color={
                          booking.bookingStatus === "Accepted" ? "green" : "red"
                        }
                        textAlign="center"
                      >
                        {booking.bookingStatus}
                      </Box>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  ---No Bookings so far---
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default History;
