import { useToast } from '@chakra-ui/react';
import './css/cont.css';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextAPI';

const ContactUs = () => {
  const toast = useToast();
  const { user } = useAuth();  // Get the logged-in user's details

  const [contact, setContact] = useState({
    message: ''
  });

  // Handle the form submission
  const handleClick = async (e) => {
    e.preventDefault();

    // Create an object to send with the API request, including name, email, and message
    const contactData = {
      name: user?.name || '',  
      email: user?.email || '', 
      message: contact.message  // 
    };

    try {
      const result = await axios.post(`/api/contactUs`, contactData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (result.data.success) {
        toast({
          title: result.data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        });
        setContact({
          message: ''  
        });
      }
    } catch (error) {
      const x = error.response?.data?.message || 'server is down';
      toast({
        title: x.length > 40 ? x.split(':')[0] : x,
        description: x !== 'server is down' ? 'input field is too short or too long' : '',
        status: x.length > 45 ? 'warning' : 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <div className="contact container">
      <form>
        <div className="form">
          <div className="form-txt">
            <h1>Contact us</h1>
            <span>We pay strict attention to our clients regarding their concerns</span>
            <h3 id='adr'>7th floor, C-block, New Boys Hostel, MNNIT Allahabad</h3>
            <p>Prayagraj, 211004<br />Uttar Pradesh, India</p>
          </div>
          <div className="form-details">

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={user ? user.name : 'Please login first'}
              readOnly
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={user ? user.email : 'Please login first'}
              readOnly
            />
            
            <textarea
              name="message"
              id="message"
              cols="60"
              rows="7"
              placeholder="Message"
              onChange={handleChange}
              value={contact.message}
              required
            />

            <button type="submit" onClick={handleClick}>SEND MESSAGE</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
