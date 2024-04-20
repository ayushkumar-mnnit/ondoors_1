import React, { useEffect, useState } from 'react';
import './serv.css';
import { useAuth } from '../../jwt_Store/jwtStorage';
import axios from 'axios';

export const ServiceForm = () => {
  const { user, card, allUsers } = useAuth();
  const [loading, setLoading] = useState(true);
  const [ar, setAr] = useState([]);
  const [service, setService] = useState('');

  const handleChange = (e) => {
    setService(e.target.value);
  };

  const [client, setClient] = useState({
    clati: 0,
    clongi: 0
  });

  const address = user.address;

  const API_KEY = '661e8f448eef6632201733fxn293651';
  const ApiEndPoint = 'https://geocode.maps.co/search';

  const geo = async (customAddress) => {
    try {
      const response = await axios.get(`${ApiEndPoint}?q=${customAddress}&api_key=${API_KEY}`);
      if (response.data.length !== 0) {
        const lati = response.data[0].lat;
        const longi = response.data[0].lon;
        return { lati, longi };
      } else {
        return false;
      }
    } catch (error) {
      console.error('geo error', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { lati, longi } = await geo(address);
        setClient({ clati: lati, clongi: longi });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    };

    fetchData();
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let temp = [];
      for (let i = 0; i < allUsers.length; i++) {
        try {
          const { lati, longi } = await geo(allUsers[i].address);
          const distance = dist(client.clati, client.clongi, lati, longi);
          if (allUsers[i].role === 'Service Provider' && allUsers[i].serviceType === service) {
            temp.push({
              name: allUsers[i].name,
              email: allUsers[i].email,
              address: allUsers[i].address,
              role: allUsers[i].role,
              isAdmin: allUsers[i].isAdmin,
              serviceType: allUsers[i].serviceType,
              distance
            });
          }
        } catch (error) {
          console.error('Error fetching geo data:', error);
          temp.push(null);
        }
      }
      // Sort temp in ascending order
      temp.sort((a, b) => a.distance - b.distance);

      setAr(temp); // Update ar array with sorted temp

    } catch (error) {
      console.log('error getting service provider:', error);
    }
  };

  console.log(ar);

  // Haversine formula
  function dist(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  if (loading) return <h6>Loading</h6>;

  return (
    <>
      <div className="edit-profile-container">
        <div className="edit-profile">
          <h6>Get the services as per your convenience</h6>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="edit-field">
              <div className="edit-field-pro dim">
                <label htmlFor="edit-name">Name:</label>
                <input type="text" id="edit-name" name="name" value={user ? user.name : ''} readOnly />
              </div>
              <div className="edit-field-pro dim">
                <label htmlFor="edit-email">Email:</label>
                <input type="email" id="edit-email" name="email" value={user ? user.email : ''} readOnly />
              </div>
              <div className="edit-field-pro dim">
                <label htmlFor="edit-address">Address:</label>
                <input type="text" id="edit-address" name="address" value={user ? user.address : ''} readOnly />
              </div>
              <div className='field'>
                <label htmlFor='serviceType'>Service Type:</label>
                <select id='serviceType' name='service' value={service} onChange={handleChange} required>
                  <option value=''>Select one option</option>
                  {card.map((cur, index) => (
                    <option key={index} value={cur.title}>{cur.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn-rlog">Find the Service Provider</button>

                {ar.length===0?<h5 id='nosp'>Oops! no service provider found</h5>:void 0}

            {ar.map((cur, index) => (
              <h1 key={index}>{cur.name}</h1>
            ))}
          
          </form>
        </div>
      </div>
    </>
  );
};
