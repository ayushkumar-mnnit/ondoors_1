
import { TabList, TabPanel, TabPanels, Tabs, Tab, Button} from '@chakra-ui/react'
// import './css/land.css' 
import './css/prof.css'
import Profile from './Profile'
import Services from './Services'
import ChangePassword from './ChangePass'
import { Link } from 'react-router-dom'

import History from './History'
import Notif from './Notif'
import { useAuth } from '../context/ContextAPI'
import ContactAdmin from './ContactAdmin'

import { FaUserCircle } from "react-icons/fa";
import { PiNote } from "react-icons/pi";
import { BiSolidMessageDetail } from "react-icons/bi";
import { BiSolidBellRing } from "react-icons/bi";
import { RiLockPasswordLine, RiServiceFill } from "react-icons/ri";


const LandingPage = () => {

    const {user}=useAuth();

    

    return (
        <>
        
            <Tabs  p='10px'>
                <TabList>

                    <Tab color='purple'><RiServiceFill size={20} /></Tab>
                    <Tab color='purple'><FaUserCircle size={20} /></Tab>
                    <Tab color='purple'><PiNote  size={20} /></Tab>
                    {user?.role==='Service Provider'?<Tab color='purple'><BiSolidBellRing size={20} /></Tab>:null}
                    <Tab color='purple'><RiLockPasswordLine size={20} /></Tab>
                    <Tab color='purple'><BiSolidMessageDetail size={20} /></Tab>
                   
                </TabList>
                
                <TabPanels >
                   
                    <TabPanel>
                    <Link to='/' ><Button variant='ghost' ml={2} bg='green.100' _hover={{bg:'blue.100'}} >Back to Home</Button></Link>
                        <Services />
                    </TabPanel>
                    <TabPanel>
                    <p style={{color:'red', fontSize:'14px'}}>*profile is incomplete until the mobile number is updated and you may fail to avail the services</p>
                  <Profile/>
                    </TabPanel>
                    <TabPanel>
                        <History/>
                        </TabPanel>
                    {
                        user?.role==='Service Provider'?<TabPanel><Notif/></TabPanel>:null
                    }
                    <TabPanel>
                        <ChangePassword/>
                    </TabPanel>
                    <TabPanel>
                       <ContactAdmin/>
                    </TabPanel>
                  
                </TabPanels>
            </Tabs>
        </>
    )
}

export default LandingPage
