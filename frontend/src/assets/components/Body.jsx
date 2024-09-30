import { useState } from 'react';
import intro from '../images/intro.png';
 // Import your CSS for Body styles
import Login from './Login';
import Signup from './Signup';
import About from './About';
import ContactUs from './ContactUs';



const Body = () => {
  const [showLogin, setShowLogin] = useState(true); // State to toggle forms

  const toggleForm = () => {
    setShowLogin(!showLogin); // Switch between login and signup
  };

  return (
    <>
      <section id="sec1">
        <img src={intro} alt="intro" />
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
