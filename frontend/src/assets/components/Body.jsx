import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import About from './About';
import ContactUs from './ContactUs';
import intro from '../images/intro.png'



const Body = () => {
  const [showLogin, setShowLogin] = useState(true); 
  const toggleForm = () => {
    setShowLogin(!showLogin); 
  };

  return (
    <>
      <section id="sec1" >
        <img src={intro} alt="" />
      </section>
      
      <section id="sec2">
        {showLogin ? <Login toggleForm={toggleForm} /> : <Signup toggleForm={toggleForm} />}
      </section>
      
      <section id="sec3"><About/></section>
      <section id="sec4"><ContactUs/></section>
      <section id="sec5" style={{color:'navy', textAlign:'center'}} >Join us to explore more..</section>
    </>
  );
};

export default Body;
