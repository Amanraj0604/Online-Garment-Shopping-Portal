import React, { useState } from 'react'
import styled from 'styled-components';
import {mobile} from "../Responsive"
import { useDispatch, useSelector } from 'react-redux';
import {login} from "../redux/apiCalls"
const Container=styled.div`
width: 100vw;
  height: 100vh;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), /* Your gradient */
    url("https://knockout.kapsons.com/image/cache/catalog/test/men's_001-570x400-min-570x400.jpg") center; 
  background-size: cover; 
  display: flex;
   align-items: center;
   justify-content: center;
`;
const Wrapper=styled.div`
  width:25%;
  padding:20px;
  background-color:white;
  ${mobile({width:"75%"})}
`;
const Title=styled.h1`
font-size:24px;
font-weight:300;
`;
const Form=styled.form`
display:flex;
flex-direction:column;
`;

const Input=styled.input`
flex:1;
min-width:40%;
margin:10px 0px;
padding:10px;
`;
const Buttom=styled.button`
width:40%;
border:2px solid black;
padding:15px 20px;
background-color:white;
color:black;
font-weight:600;
cursor:pointer;
margin-bottom:10px;
&:hover{
  background-color:black;
  color:white;
  corder:2px solid white;
  transition: all 1s ease-out;
}
`;
const Link=styled.a`
margin:5px 0px;
font-size:12px;
text-decoration:underline;
cursor:pointer;
`;
const Error=styled.span`
  color:red;
  font-weight:700;
`;
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const {isFetching,error}=useSelector((state)=>state.user);

  const handleClick=(e)=>{
    e.preventDefault()
    login(dispatch,{email,password})
  }
  return (
    <Container>
        <Wrapper>
           
        <Link to="/">Home&gt;&gt;</Link>

            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder='Email'onChange={(e)=>setEmail(e.target.value)}/>
                <Input type="password" placeholder='Password'onChange={(e)=>setPassword(e.target.value)}/>
                <Buttom onClick={handleClick} disable={isFetching}>LOGIN</Buttom>
                {error && <Error>Something Went Wrong...</Error>}
                <Link to={"/register"}>CREATE A NEW ACCOUNT </Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login
