
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


const LandingPage = () => {

    const {user,cardLoading}=useAuth();

    if(cardLoading){
        return <h5>Loading..</h5>
    }

    return (
        <>
        
            <Tabs  p='10px'>
                <TabList>

                    <Tab color='purple'>Services</Tab>
                    <Tab color='purple'>Profile</Tab>
                    <Tab color='purple'>History</Tab>
                    {user?.role==='Service Provider'?<Tab color='purple'>Notification</Tab>:null}
                    <Tab color='purple'>Change password</Tab>
                    <Tab color='purple'>Contact Admin</Tab>
                   
                </TabList>
                
                <TabPanels >
                   
                    <TabPanel>
                    <Link to='/' ><Button variant='ghost' ml={2}  >Back to Home</Button></Link>
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
