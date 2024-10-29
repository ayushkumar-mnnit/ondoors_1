

import { useAuth } from "../context/ContextAPI";
import Body from "./Body"
import Footer from "./Footer"
import Navbar from "./Navbar"

import './css/load.css'


const Home = () => {

    const {loading} = useAuth();

    if (loading) {
        return ( <>
            <p style={{textAlign:"center",color:"red"}}>The server is currently on a <span color="purple"> free plan</span> that may sleep during inactivity, so it might take at most <span color="purple" > 90 seconds </span> to wake up.</p>
            <div className="lds-ripple"><div></div><div></div></div>
        </>)
    }

    return (
   <>
    <Navbar/>
    <Body/>
    <Footer/>
   </>
    )
}

export default Home




