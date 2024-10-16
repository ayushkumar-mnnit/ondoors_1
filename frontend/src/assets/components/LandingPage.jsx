
import { TabList, TabPanel, TabPanels, Tabs, Tab, Button} from '@chakra-ui/react'
// import './css/land.css' // Assuming this file contains custom CSS for your landing page
import './css/prof.css'
import Profile from './Profile'
import Services from './Services'
import ChangePassword from './ChangePass'
import { Link } from 'react-router-dom'

import History from './History'
import Notif from './Notif'
import { useAuth } from '../context/ContextAPI'
import ContactAdmin from './ContactAdmin'


const LandingPage = () => {

    const {user}=useAuth()
    return (
        <>
        
            <Tabs  p='10px'>
                <TabList>

                    <Tab color='navy'>Services</Tab>
                    <Tab color='navy'>Profile</Tab>
                    <Tab color='navy'>History</Tab>
                    {user?.role==='Service Provider'?<Tab color='navy'>Notification</Tab>:null}
                    <Tab color='navy'>Change password</Tab>
                    <Tab color='navy'>Contact Admin</Tab>
                   
                </TabList>
                
                <TabPanels >
                   
                    <TabPanel>
                    <Link to='/' ><Button variant='ghost' ml={2}  >Back to Home</Button></Link>
                        <Services />
                    </TabPanel>
                    <TabPanel>
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
