import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import About from "./About";
import ContactUs from "./ContactUs";
import intro from "../images/intro.png";

import { Button } from "@chakra-ui/react";

import { useAuth } from "../context/ContextAPI.jsx";

const Body = () => {
  const [showLogin, setShowLogin] = useState(true);
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleClick = () => {
    document.getElementById("sec2").scrollIntoView({ behavior: "smooth" });
  };

  const { loading,toggle } = useAuth();

  {toggle?document.body.style.backgroundColor="#0B192C":document.body.style.backgroundColor="white"}

  return (
    <>
      <section id="sec1">
        <img src={intro} alt="" />
      </section>
      

      <section>
  {loading ? (
    <div className="center-container" >
      <p
        style={{ textAlign: "center", color:toggle?'orangered':'red', margin: "0 10px" }}
      >
        The server is currently on a{" "}
        <span style={{ color: "purple" }}>free plan</span> that may
        sleep during inactivity, please be patient
      </p>
     
    </div>
  ) : (
    
    <p style={{ textAlign: "center", color:toggle?'lightgreen':'green' }}>
      Wohoo... we are live !!
    </p>
  )}
</section>


      <section id="sec2">
        {showLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Signup toggleForm={toggleForm} />
        )}
      </section>

      <section id="sec3">
        <About />
      </section>
      <section id="sec4">
        <ContactUs />
      </section>
      <section id="sec5" style={{ color: "navy", textAlign: "center" }}>
        <Button
          bg="green"
          color="white"
          mt={5}
          mb={5}
          variant="ghost"
          _hover={{ bg: "blue" }}
          onClick={handleClick}
        >
          Join us to explore
        </Button>
      </section>
    </>
  );
};

export default Body;
