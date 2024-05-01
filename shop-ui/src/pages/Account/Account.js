import React, { useEffect, useState } from 'react';
import Orders from '../AccountPage/Orders'; // Assuming you have an Orders component
import Contact from '../AccountPage/Contact';
import "./Account.css";
import Address from '../AccountPage/Address';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/userSlice";
// import { Edit } from '@mui/icons-material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { userRequest } from '../../requestMethod';

const Account = () => {
    const [activePage, setActivePage] = useState(null);
    const user = useSelector(state => state.user.currentUser);
    

    const handleNavigation = (page) => {
        setActivePage(page);
    };
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logout());

    };
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
        <>
            <Navbar />
            <div className="account-container">
                <div className="left-section">
                    <div className="profile-section">
                        <div className="profile-image" style={{fontWeight:700}}>{user && user.username && user.username.length > 0 && user.username[0]}</div> {/* Placeholder for profile image */}
                        <div className="profile-details">
                            <h4>User Name</h4>
                            <p>{user.username}</p>
                            <p>  <h4>Email:</h4>{user.email}</p>
                            {/* <p><h4>Phone:</h4>{address.phoneNo}</p> */}
                            {/* <button className="edit-button" ><Edit/></button> */}
                        </div>
                    </div>
                    <div className="navigation-section">
                        <button className="nav-button">
                            <Link to={"/"} style={{ textDecoration: "none" }}>Home</Link>
                        </button>
                        <button className="nav-button" onClick={() => handleNavigation('orders')}>Orders</button>
                        <button className="nav-button" onClick={() => handleNavigation('customerCare')}>Customer Care</button>
                        <button className="nav-button" onClick={() => handleNavigation('address')}>Address</button>
                        <button className="nav-button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="right-section">
                    {activePage === 'orders' && <Orders />}
                    {activePage === 'customerCare' && <Contact />}
                    {activePage === 'address' && <Address />}
                    {activePage === null && 
                       <iframe width="1100" height="600" src="https://www.youtube.com/embed/pYFM1r3spVU?si=KNppA38pAchVqq9g&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                    }
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Account;
