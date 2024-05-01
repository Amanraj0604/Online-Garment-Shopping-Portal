import { Facebook, Instagram, LocalPhoneSharp, LocationOnOutlined, MailOutlineSharp, Twitter, WhatsApp } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive';

const Container=styled.div`
    display:flex;
    padding:40px;
    ${mobile({flexDirection:"column"})}
`;

const Left=styled.div`

flex:1;
display:flex;
flex-direction:column;
padding:20px;
`;
const Logo=styled.h1`
    background-color:black;
    color:white;
    display:flex;
    align-items: center;
    justify-content: center;      
    ${mobile({fontSize:"24px" ,textAlign:"center"})}  
`;
const Desc=styled.p`
    margin:20px 0px;
    ${mobile({fontSize:"15px"})} 
`;
const SocialContainer=styled.div`
    display:flex; 
     ${mobile({fontSize:"24px"})}  
`;
const SocialIcon=styled.div`
width:40px;
height:40px;
border-radius:50%;
color:white;
background-color:black;
display:flex;
align-items: center;
justify-content: center;
margin-right:20px;
cursor:pointer;
${mobile({width:"30px",height:"30px"})} 
`;

const Center=styled.div`
flex:1;
padding:20px;
${mobile({display:"none"})}
`;
const Title=styled.h3`
    margin-bottom:30px;
`;
const List=styled.ul`
    margin:0;
    padding:0;
    list-style: none;
   display: flex;
   flex-wrap: wrap;
`;
const ListItem=styled.li`
width:50%;
margin-bottom:10px;
`;
const Right=styled.div`
flex:1;
padding:20px;

`;
const ContactItem=styled.div`
    margin-bottom:20px;
    display:flex;
    align-items:center;
`;
const Payment=styled.img`
width:50%;
${mobile({width:"80%"})} 
`;
const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>
            𝔾𝕖𝕖𝕥𝕒𝕟𝕛𝕒𝕝𝕚 ℝ𝕖𝕒𝕕𝕪𝕞𝕒𝕕𝕖
            </Logo>
            <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eaque corporis earum quisquam fuga dolore exercitationem repudiandae unde sunt, tempore, et in velit dolorum, sit </Desc>
            <SocialContainer>
                <SocialIcon>
                    <Facebook/>
                </SocialIcon>
                <SocialIcon>
                    <Instagram/>
                </SocialIcon>
                <SocialIcon>
                    <Twitter/>
                </SocialIcon>
                <SocialIcon>
                    <WhatsApp/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><LocationOnOutlined style={{marginRight:"10px"}}/> MukhiyaJi Chouk Sabji Mandi Narkatiaganj Bihar,845455 </ContactItem>
            <ContactItem><LocalPhoneSharp style={{marginRight:"10px"}}/> +918969241800</ContactItem>
            <ContactItem><MailOutlineSharp style={{marginRight:"10px"}}/> readymadegeetanjali@gmail.com</ContactItem>
            <Payment src="https://assets-global.website-files.com/610953326e72a04426f4a4db/610953326e72a04b63f4a9da_Hitpay-Image-3.png"/>
        </Right>

    </Container>
  )
}

export default Footer
