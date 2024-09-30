
import { TabList, TabPanel, TabPanels, Tabs, Tab } from '@chakra-ui/react'
// import './css/land.css' // Assuming this file contains custom CSS for your landing page
import './css/prof.css'
import Profile from './Profile'
import Services from './Services'
import ChangePassword from './ChangePass'


const LandingPage = () => {
    return (
        <>
        
            <Tabs  p='10px'>
                <TabList>

                    <Tab color='navy'>Services</Tab>
                    <Tab color='navy'>Profile</Tab>
                    <Tab color='navy'>Change password</Tab>
                    <Tab color='navy'>Contact Admin</Tab>
                   
                </TabList>
                
                <TabPanels >
                   
                    <TabPanel>
                        <Services/>
                    </TabPanel>
                    <TabPanel>
                  <Profile/>
                    </TabPanel>
                    <TabPanel>
                        <ChangePassword/>
                    </TabPanel>
                    <TabPanel>
                        <p>admin help</p>
                    </TabPanel>
                  
                </TabPanels>
            </Tabs>
        </>
    )
}

export default LandingPage