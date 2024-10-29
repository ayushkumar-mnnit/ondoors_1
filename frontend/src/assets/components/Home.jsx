

import { useAuth } from "../context/ContextAPI";
import Body from "./Body"
import Footer from "./Footer"
import Navbar from "./Navbar"

import './css/load.css'


const Home = () => {

    const {loading} = useAuth();

    if (loading) {
        return (
            <>
                <div className="lds-ripple"><div></div><div></div></div>
                <p style={{ color: 'red', textAlign: 'center' }}>
                    The site is currently hosted on a free server, so it may take some time to load
                </p>
            </>
        );
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




