import '.././css/dash.css';

import { TabList, TabPanel, TabPanels, Tabs, Tab, Text, Box } from '@chakra-ui/react';

import AllUsers from './AllUsers';
import AllContacts from './AllContacts';
import AllFeedbacks from './AllFeedbacks';
import Profile from '../Profile';
import ChangePassword from '../ChangePass';
import AllServices from './AllServices';
import { useAuth } from '../../context/ContextAPI';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Tabs p='10px' className='admin-tab'>
        <TabList color='white'>
          <Tab>Admin Home</Tab>
          <Tab>Users</Tab>
          <Tab>Contact Msg</Tab>
          <Tab>Feedbacks</Tab>
          <Tab>Services</Tab>
          <Tab>Profile</Tab>
          <Tab>Change Password</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <Link to='/' ><Button  ml={2} bg='rgb(1, 1, 57)' color='white'   
          _hover={{ bg: 'lightblue',color: 'black'}}>Back to Home</Button></Link>
            <h2 id='adm'>Welcome! {user.name ? user.name : 'User'} to the Admin Dashboard</h2>
            <Box color='cyan' gap='3' m='2%' fontSize='1rem' lineHeight='3rem'>
              <Text>
                As an admin responsible for user data protection, following stringent guidelines is essential to ensure confidentiality, integrity, and availability of user information.
              </Text>
              <br />
              <Text as="h5" fontWeight="bold">Data Collection:</Text>
              <Text>Collect only the information necessary for platform operations. Avoid gathering unnecessary personal data to minimize risks of data breaches.</Text>
              <br />
              <Text as="h5" fontWeight="bold">Encryption:</Text>
              <Text>Encrypt sensitive user data both in transit and at rest. Use strong algorithms like AES-256 for protecting passwords and personal identifiers, and implement HTTPS for secure communication.</Text>
              <br />
              <Text as="h5" fontWeight="bold">Access Control:</Text>
              <Text>Limit access to user data based on the principle of least privilege. Ensure only authorized personnel have access to sensitive information through role-based access control (RBAC).</Text>
              <br />
              <Text as="h5" fontWeight="bold">Authentication:</Text>
              <Text>Enforce strong authentication protocols, including multi-factor authentication (MFA), to prevent unauthorized access. Passwords should be complex and hashed securely.</Text>
              <br />
              <Text as="h5" fontWeight="bold">Regular Audits:</Text>
              <Text>Conduct regular audits of systems handling user data to identify vulnerabilities. Continuous monitoring of access logs can help detect suspicious activities in real time.</Text>
              <br />
              <Text as="h5" fontWeight="bold">User Consent:</Text>
              <Text>Obtain explicit user consent for data collection and processing. Maintain transparency about how user data is used, stored, and shared, and provide options for users to manage their data.</Text>
              <br />
              <Text as="h5" fontWeight="bold">Data Breach Response:</Text>
              <Text>Establish a data breach response plan to promptly notify affected users and authorities in case of a breach. Regular training for staff on data protection policies is also crucial to maintaining security standards.</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <AllUsers />
          </TabPanel>
          <TabPanel>
            <AllContacts />
          </TabPanel>
          <TabPanel>
            <AllFeedbacks />
          </TabPanel>
          <TabPanel>
            <AllServices />
          </TabPanel>
          <TabPanel>
            <Profile />
          </TabPanel>
          <TabPanel>
            <ChangePassword />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Dashboard;
