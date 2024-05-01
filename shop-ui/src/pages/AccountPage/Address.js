import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import "./Address.css";
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod';

const Address = () => {
    const user = useSelector(state => state.user.currentUser);
    const [address, setAddress] = useState("");

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await userRequest.get(`address/${user._id}`);
                setAddress(response.data[0]);
            } catch (error) {
                // setMessage('Error fetching address: ' + error.message);
            }
        };

        fetchAddress();
    }, [user._id]);
    return (
        <div className="customer-details-container">
            <div className="customer-details">
                <h2>Costomer Contacts</h2>
                <div className="detail-item">
                    <label>Name:</label>
                    <span>{address.name}</span>
                </div>
                <div className="detail-item">
                    <label>Phone:</label>
                    <span>{address.phoneNo}</span>
                </div>
                <div className="detail-item">
                    <label>Address</label>
                    <span>{address.flatNo}&nbsp;{address.locality}&nbsp;{address.city}&nbsp;{address.state}&nbsp;{address.landmark}</span>
                </div>
                <div className="detail-item">
                    <label>PinCode</label>
                    <span>{address.pincode}</span>
                </div>
                <Link to="/edit">
                    <button className="edit-button">Edit Address</button>
                </Link>
            </div>
        </div>
    );
}

export default Address;
