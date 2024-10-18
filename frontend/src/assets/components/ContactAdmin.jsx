import { useToast } from '@chakra-ui/react';
import './css/cont.css';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextAPI';
const api='https://ondoors-1.onrender.com'  // hosted backend url

const ContactAdmin = () => {
  const toast = useToast();
  const { user,token } = useAuth();  // Get the logged-in user's details

  const [contact, setContact] = useState({
    message: '',
    email: user?.email || ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };


  // Handle the form submission
  const handleClick = async (e) => {
    e.preventDefault();

    // Create an object to send with the API request, including name, email, and message
    const contactData = {
      message: contact.message,
      email: user?.email || ''
    };

    try {
      const result = await axios.post(`${api}/admin/ContactAdmin`, contactData, {
        headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
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


  

  return (
    <div className="contact container">
      <form>
        <div className="form">
          <div className="form-txt">

            <span>You may write us any query which you think needs attention of the admin directly. </span>
            <h3 id='adr'>For ex: If you are new service provider on this platform and your service is not listed
            then simply send the service description  and admin will add it</h3>
          </div>
          <div className="form-details">
            
            <textarea
              name="message"
              id="message"
              cols="52"
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

export default ContactAdmin;
