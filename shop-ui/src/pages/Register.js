import styled from '@emotion/styled';
import { mobile } from '../Responsive';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation ,Link} from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url("https://www.westside.com/cdn/shop/files/L1_Collection_1920x900_06_copy_3.jpg?v=1704029023") center; 
  background-size: cover; 
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Title2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color:green;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
`;
const ButtomOTP=styled.button`
flex:1;
min-width:40%;
margin:20px 10px 0px 0px;
padding:10px;
background-color:white;
color:black;
font-weight:600;
cursor:pointer;
&:hover{
  background-color:black;
  color:white;
  corder:2px solid white;
  transition: all 1s ease-out;
}
`;

const Button = styled.button`
  width: 40%;
  border: 2px solid black;
  padding: 15px 20px;
  background-color: white;
  color: black;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
    border: 2px solid white;
    transition: all 1s ease-out;
  }
`;

const Agreement = styled.span`
  margin: 20px 0px;
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [OTP, setOTP] = useState('');
  const [res, setRes] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const location = useLocation();

  // Function to send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/shop/auth/sendOTP', { email });
      setRes(response.data);
    } catch (error) {
      setRes(error.response.data);
    }
  };

  // Function to register user
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/shop/auth/register', { username, email, password, OTP });
      setRes(response.data);
      // Set state to trigger redirection after 5 seconds
      setRedirectToLogin(true);
    } catch (error) {
      setRes(error.response.data);
    }
  };

  // Redirect to login page after 5 seconds
  useEffect(() => {
    let timeoutId;
    if (redirectToLogin) {
      timeoutId = setTimeout(() => {
        // Redirect logic here
        window.location.pathname = '/login'; // Redirect to '/login' after 5 seconds
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [redirectToLogin]);

  // Effect to retrieve email from storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('registeredEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // Effect to store email in storage when changed
  useEffect(() => {
    localStorage.setItem('registeredEmail', email);
  }, [email]);

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {res && <Title2>{res}...</Title2>}
        <Form>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <ButtomOTP onClick={handleSendOTP}>SEND OTP</ButtomOTP>
          <Input type="text" placeholder='User Name' value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input type="text" placeholder="OTP" value={OTP} onChange={(e) => setOTP(e.target.value)} />
          {/* <Agreement>
            By Creating an Account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement> */}
          <Agreement>
            If You All Rady an Account Then Go To <Link to={"/login"}><b>SIGN IN</b></Link> Page
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
