import axios from 'axios';
import './css/prof.css';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import { useAuth } from '../context/ContextAPI';

const Profile = () => {
    const toast = useToast();
    const { user,HardCodedCards } = useAuth();

    
    
    const [editMode, setEditMode] = useState(false);
   
    const serviceTypes = HardCodedCards;
  

    const [info, setInfo] = useState({
        mobile: user.mobile || '',
        address: user.address || '',
        pincode: user.pincode || '',
        role: user.role || '',
        serviceType: user.serviceType || '',
    });

    // Sync info state with user data when user changes
    useEffect(() => {
        setInfo({
            mobile: user.mobile || '',
            address: user.address || '',
            pincode: user.pincode || '',
            role: user.role || '',
            serviceType: user.serviceType || '',
        });
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    const handleRoleChange = (e) => {
        const { value } = e.target;
        setInfo((prevUser) => ({
            ...prevUser,
            role: value,
            serviceType: value === 'Client' ? '' : prevUser.serviceType
        }));
    };

    const saveChanges = async () => {
        try {
            const { name } = user; // Assuming you get the name from the user object

            const response = await axios.patch(`/api/updateProfile`, {
                name,
                mobile: info.mobile,
                address: info.address,
                role: info.role,
                serviceType: info.serviceType,
                pincode: info.pincode
            });

            if (response.data.success) {
                toast({
                    title: 'Profile updated successfully',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
                setEditMode(false);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: error.response?.data?.message || 'Failed to update profile',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <div className="container-prof rounded bg-white mt-3 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right d-flex align-items-center">
                                Profile
                                {!editMode ? (
                                    <FaEdit onClick={() => setEditMode(true)} size={20} color='blue' style={{ marginLeft: '10px', cursor: 'pointer' }} />
                                ) : (
                                    <MdDoneOutline onClick={saveChanges} size={20} color='green' style={{ marginLeft: '10px', cursor: 'pointer' }} />
                                )}
                            </h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user.name.split(' ')[0] || ''}
                                    readOnly
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={user.name.split(' ').slice(1).join(' ') || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Email</label>
                            <input type="text" className="form-control" value={user.email} readOnly />
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Mobile number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mobile"

                                    value={info.mobile}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={info.address}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Pin code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    value={info.pincode}
                                    onChange={handleChange}
                                    readOnly={!editMode}
                                />
                            </div>

                            <div className="col-md-12 mt-3">
                                <label className="labels">Role</label>
                                <div className="d-flex">
                                    <div className="form-check me-3">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="client"
                                            name="role"
                                            value="Client"
                                            checked={info.role === 'Client'}
                                            onChange={handleRoleChange}
                                            disabled={!editMode}
                                        />
                                        <label className="form-check-label" htmlFor="client">Client</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="serviceProvider"
                                            name="role"
                                            value="Service Provider"
                                            checked={info.role === 'Service Provider'}
                                            onChange={handleRoleChange}
                                            disabled={!editMode}
                                        />
                                        <label className="form-check-label" htmlFor="serviceProvider">Service Provider</label>
                                    </div>
                                </div>
                            </div>

                            {info.role === 'Service Provider' && (
                                <div className="col-md-12 mt-3">
                                    <label className="labels">Service Type</label>
                                    <select
                                        className="form-select"
                                        name="serviceType"
                                        value={info.serviceType}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    >
                                        <option value="" disabled>Select service type</option>
                                        {serviceTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="mt-5 text-center">
                            
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default Profile;
