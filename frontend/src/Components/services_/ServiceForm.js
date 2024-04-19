import React, { useEffect, useState } from 'react';
import './serv.css';
import { useAuth } from '../../jwt_Store/jwtStorage';
import axios from 'axios';


export const ServiceForm = () => {
  const { user, authToken, card } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sp, setsp] = useState([]);
  const [ar, setAr] = useState([]);
 
  const [servicetype,setType]=useState({serviceType:''})

  const handleChange=async(e)=>{
    const {name,value}=e.target
    setType({...servicetype,[name]:value})
  }


  const [client, setclient] = useState({
    clati: 0,
    clongi: 0
  });

  const address = user.address;
//   console.log(address);

  const API_KEY = '661e8f448eef6632201733fxn293651';
  const ApiEndPoint = 'https://geocode.maps.co/search';

  const geo = async (customAddress) => {
    try {
      const response = await axios.get(`${ApiEndPoint}?q=${customAddress}&api_key=${API_KEY}`);
        // console.log(response.data.length);
        console.log(response);
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
        setclient({ clati: lati, clongi: longi });
        setLoading(false)
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    };

    fetchData();
  }, [loading]);

  const getServiceProvider = async () => {
    try {
      const result = await fetch('http://localhost:5000/admin/allusers', {
        method: 'GET',
        headers: {
          Authorization: authToken
        }
      });

      if (result.ok) {
        const data = await result.json();
        setsp(data.result);
        setLoading(false);
      } else {
        console.log('error occurred');
      }
    } catch (error) {
      console.log('error fetching service providers', error.message);
    }
  };

  useEffect(() => {
    getServiceProvider();
  }, [loading]);



  let lat1 = client.clati;
  let lon1 = client.clongi;

//   console.log('lati,longi of user',lat1,lon1);

//   Haversine formula
function dist(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
}

//   console.log(dist(lat1,lon1,26.8467,80.9462));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let temp = [];
      for (let i = 0; i < sp.length; i++) {
        try {
          const { lati, longi } = await geo(sp[i].address);
          const distance = dist(lat1,lon1,lati,longi);
          temp.push({
            name: sp[i].name,
            email: sp[i].email,
            address: sp[i].address,
            role: sp[i].role,
            isAdmin: sp[i].isAdmin,
            serviceType:sp[i].serviceType,
            distance
          });
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

//   console.log('arrrrr',ar);
//   -----------yaha tak theek hai, 'ar' me data a raha hai
  
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
              {
                <div className='field'>
                  <label htmlFor='serviceType'>Service Type:</label>
                  <select id='serviceType' name='serviceType' value={user.serviceType} onChange={handleChange} required>
                    <option value=''>Select one option</option> 
                    {card.map((cur,index)=>{
                      return <option key={index} value={cur.title}>{cur.title}</option> 
                    })}
                  </select>
                </div>
              }
            </div>
            <button className="btn-rlog">Find the Service Provider</button>

            {ar.map((cur, index) => {
    if (cur.role === 'Service Provider' && cur.distance !== 0 ) {
        return <h1 key={index}>{cur.name}</h1>;
    } else {
        return null; // Return null for items that don't meet the condition
    }
})}

          </form>

          
        </div>
      </div>
    </>
  );
};
