import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/userSlice";
import { Language, NotificationsNone, Settings } from '@mui/icons-material';
import "./topbar.css";
export default function Topbar() {
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logout());

    };
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">
                        Geetanjali Readymade Admin
                    </span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                    <button className="nav-button" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        {/* <Language /> */}
                        {/* <span className="topIconBadge">2</span> */}
                    </div>
                    <div className="topbarIconContainer">
                        {/* <Settings /> */}
                    </div>
                    <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
