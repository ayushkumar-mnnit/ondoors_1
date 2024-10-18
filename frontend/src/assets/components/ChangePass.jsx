import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import './css/prof.css';
import { useAuth } from '../context/ContextAPI';

const api='https://ondoors-frontend.onrender.com'  // hosted backend url

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const toast = useToast();
    const [isHovered, setIsHovered] = useState(false); // State to manage hover

    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            toast({
                title: 'New password must be at least 8 characters long',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        try {
            const response = await axios.patch(`${api}/changePassword`, {
                oldPassword,
                newPassword,
            } , {
                headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`,
                },withCredentials: true
              });

            if (response.data.success) {
                toast({
                    title: 'Password changed successfully',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
                setOldPassword('');
                setNewPassword('');
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast({
                title: error.response?.data?.message || 'Failed to change password',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <div className="profile-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
            <div className="form-wrapper" style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '8px', boxShadow: '1px 2px 10px rgba(0, 0, 0,1)', backgroundColor: '#fff' }}>
                <h4 className="profile-title">Change Password</h4>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label htmlFor="oldPassword" style={{ fontSize: '14px' }}>Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label htmlFor="newPassword" style={{ fontSize: '14px' }}>New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="profile-button"
                        onMouseEnter={() => setIsHovered(true)} // Set hover state to true
                        onMouseLeave={() => setIsHovered(false)} // Set hover state to false
                        style={{
                            display: 'block',
                            margin: '0 auto', // Center the button
                            padding: '10px 20px',
                            border: '1px solid green', // Green border
                            backgroundColor: isHovered ? ' rgb(199, 236, 224)' : 'white', // Change background on hover
                            color: 'green',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px', // Slightly smaller font size
                        }}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
