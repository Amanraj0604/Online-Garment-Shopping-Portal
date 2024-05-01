// Login.js

import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux'; // Importing the useDispatch hook
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Using the useDispatch hook inside the functional component

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })) // Dispatching the login action with user object
      .then((data) => {
        // Handle successful login if needed
        console.log("Logged in successfully:", data);
      })
      .catch((error) => {
        // Handle login failure if needed
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form>
        <div className="input-group">
          <label className='loginlabel' htmlFor="Email">Email Id:</label>
          <input className='logininput'
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className='loginlabel' htmlFor="password">Password:</label>
          <input className='logininput'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='loginbutton' type="button" onClick={handleClick}>Login</button>
      </form>
    </div>
  );
};

export default Login;
