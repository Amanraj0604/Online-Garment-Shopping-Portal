import styled from '@emotion/styled'
import { Send } from '@mui/icons-material';
import React from 'react'
import { mobile } from '../Responsive';
const Container=styled.div`
   height: 60vh;
   background-color: rgb(208, 247, 234);
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction:column;
`;

const Title=styled.h1`
    font-size:70px;
    margin-buttom:20px;
    ${mobile({fontSize:"50px"})};
`;
const Desc=styled.div`
    font-size:24px;
    font-weight:300;
    
    ${mobile({textAlign:"center",fontSize:"20px",letterSpacing:"3px"})};

`;
const InputContainer=styled.div`
 width:40%;
 height:40px;
 background-color:white;
 display:flex;
 justify-content:space-between;
 border: 3px solid lightgray;
 margin-top:20px;
  
 ${mobile({width:"80%"})};
`;
const Input=styled.input`
border:none;
flex:8;
padding-left:25px;
font-size:15px;
font-weight:300;
color:black;
`;
const Button=styled.button`
flex:1;
cursor:pointer;
border: none;
background-color: teal;
color: white;
`;
const Newsletter = () => {
  return (
    <Container>
        <Title>NewsLetter</Title>
        <Desc>Get timely update on your favorite products.</Desc>
        <InputContainer>
            <Input placeholder='Your Email'/>
            <Button>
                <Send/>
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter
