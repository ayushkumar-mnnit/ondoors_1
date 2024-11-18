import { Box, useToast } from '@chakra-ui/react';
import './css/cont.css';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/ContextAPI.jsx';
const api='https://ondoors-1.onrender.com'  // hosted backend url

const ContactUs = () => {
  const toast = useToast();
  const { user,token,toggle } = useAuth();  // Get the logged-in user's details

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
      const result = await axios.post(`${api}/contactUs`, contactData, {
        headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
      });

      if (result.data.success) {
        toast({
          description: result.data.message,
          status: 'success',
          duration: 2000,
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
        duration: 2000,
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
    <div className="contact container" >
      <form>
        <div className="form">
          <div className="form-txt" >
            <h1 style={{color:toggle?'white':'black'}}>Contact us</h1>
            <span style={{color:toggle?'white':'black'}}>We pay strict attention to our clients regarding their concerns</span>
            <h3 style={{color:toggle?'white':'black'}} id='adr'>7th floor, C-block, New Boys Hostel, MNNIT Allahabad</h3>
            <p style={{color:toggle?'white':'black'}}>Prayagraj, 211004<br />Uttar Pradesh, India</p>
          </div>
          <div className="form-details">

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={user ? user.name : 'Please login first'}
              readOnly
              style={{backgroundColor:toggle?'#0B192C':'white',color:toggle?'white':'black'}}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={user ? user.email : 'Please login first'}
              readOnly
              style={{backgroundColor:toggle?'#0B192C':'white',color:toggle?'white':'black'}}
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
              style={{backgroundColor:toggle?'#0B192C':'white',color:toggle?'white':'black'}}
            />
              <Box display="flex" gap="10px" alignItems={"center"} >
            <button type="submit" onClick={handleClick} style={{backgroundColor:toggle?'#0B192C':'white',color:toggle?'white':'black',border:toggle?'1px solid white':'1px solid #0B192C',padding:'2px 10px' }}>SEND</button>
            <p style={{color:toggle?'lightgreen':'red',fontSize:'14px'}}>you need to login to send a message</p>
            </Box>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
