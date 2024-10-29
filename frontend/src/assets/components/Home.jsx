

import { useAuth } from "../context/ContextAPI";
import Body from "./Body"
import Footer from "./Footer"
import Navbar from "./Navbar"

import './css/load.css'


const Home = () => {

    const {loading} = useAuth();

    if (loading) {
        return <div className="lds-ripple"><div></div><div></div></div>
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




