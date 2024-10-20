import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import About from './About'
import ContactUs from './ContactUs'
import intro from '../images/intro.png'

import { Button } from '@chakra-ui/react'



const Body = () => {
  const [showLogin, setShowLogin] = useState(true) 
  const toggleForm = () => {
    setShowLogin(!showLogin) 
  }

  const handleClick = () => {
    document.getElementById('sec2').scrollIntoView({ behavior: 'smooth' });  
  }

  return (
    <>
      <section id="sec1" >
        <img src={intro} alt="" />
      </section>
      <p style={{color:'red', fontSize:'15px',textAlign:'center' }}>Website is currently hosted on a <span style={{color:'blue'}}>free server</span> that sleeps during inactivity, so for the first time response <span style={{color:'blue'}}>may</span> be delayed by atmost 50 seconds while it wakes up.<span style={{color:'green'}}>Please be patient !</span>  </p>
      <section id="sec2">
        {showLogin ? <Login toggleForm={toggleForm} /> : <Signup toggleForm={toggleForm} />}
      </section>
      
      <section id="sec3"><About/></section>
      <section id="sec4"><ContactUs/></section>
      <section id="sec5" style={{color:'navy', textAlign:'center'}} >

      <Button bg='green' color='white' mt={5} mb={5} variant='ghost' _hover={{bg:'blue'}} onClick={handleClick}>
      Join us to explore
      </Button>

      </section>
    </>
  )
}

export default Body
