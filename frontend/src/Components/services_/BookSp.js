import React, { useState,useEffect } from 'react';
import './bk.css';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { useAuth } from '../../jwt_Store/jwtStorage';

export const BookSp = () => {
    const {user}=useAuth()
    const [email, setEmail] = useState('');
    const location = useLocation(); // Get location object

    // Extract user email from location object on component mount
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userEmail = searchParams.get('userEmail');
        setEmail(userEmail);
    }, [location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Construct mailto: URL with user's email address
        const mailtoUrl = `mailto:${email}?subject=Booking Request&body=${encodeURIComponent(formData.toString())}`;

        // Open email client with pre-filled fields
        window.open(mailtoUrl);
    };

    return (
        <div>
            <div className='profile-container'>
                <div className='profile'>
                    <div className='profile-info'>
                        <form onSubmit={handleSubmit}>
                            <div className='field'>
                                <div className="edit-field-pro dim">
                                    <label htmlFor="edit-name">Name:</label>
                                    <input type="text" id="edit-name" name="name" value={user ? user.name : ''} readOnly />
                                </div>
                                <div className="edit-field-pro dim">
                                    <label htmlFor="edit-email">Email:</label>
                                    <input type="email" id="edit-email" name="email" value={user ? user.email : ''} readOnly />
                                </div>
                                <div className="edit-field-pro dim">
                                    <label htmlFor="edit-address">Address:</label>
                                    <input type="text" id="edit-address" name="address" value={user ? user.address : ''} readOnly />
                                </div>
                            </div>
                            <div className='field'>
                                <label className='lab'>*Date & Time</label>
                                <input className="msg" type='text' name="date&time" required='true' placeholder='ex. 4pm to 6pm on 20/4/24' />
                            </div>
                            <div className='field'>
                                <label className='lab'>*Landmark</label>
                                <input className="msg" name="landmark" required='true' placeholder='ex. Balson Chauraha' />
                            </div>
                            <div className='field'>
                                <label className='lab'>Message</label>
                                <textarea className="msg" name="message" rows="3" cols="46" placeholder='anything else to mention..'></textarea><br />
                                <p id='str'>* means required field</p>
                            </div>
                            <div className='field'>
                                <button className='btn-rlog' type='submit'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
