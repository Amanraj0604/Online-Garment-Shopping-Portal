import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Announcements from '../components/Announcement';
import Footer from '../components/Footer';
import img1 from '../aserts/cet/shoues1.png';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../Responsive';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../redux/cartRedux';
import { userRequest } from '../requestMethod';
import { Link } from 'react-router-dom';
import { Alert } from '@mui/material';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: None;
  color:green;
  font-weight:700;
  font-size:25px;
  margin: 0px 10px;
`;
const Buttom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 300px;
  ${mobile({ width: "150px", height: "40%", marginTop: "60px" })}
`;
const Details = styled.div`
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`
font-weight:700;
font-size:20px;
color:green;
`;
const ProductId = styled.span`
font-weight:500
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid black;
`;
const ProductSize = styled.span`
font-weight:700;`;
const ProductDelete = styled.span`
    padding: 15px 50px;
    font-size: 15px;
    font-weight: 700;
    color: black;
    background-color: lightgray;
    cursor: pointer; 
    margin-top: 20px;
    &:hover {
        color: gray;
        background: #000;
        transition: all 1s ease-in-out;
    }
`;
const PriceDetails = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;
const ProductAmount = styled.div`
  font-size: 15px;
  margin: 5px;
  border: 1px solid gray;
  padding: 5px 10px;
  font-weight:700;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px", fontSize: "20px", fontWeight: "600" })}
`;
const Hr = styled.hr`
  background: #eee;
  border: none;
  height: 3px;
`;
const Summary = styled.div`
  flex: 1;
  border: 2px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 47vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`
  font-weight: 600;
`;
const SummaryItemPrice = styled.span`
  font-weight: 700;
`;
const SummaryButton = styled.button`
  padding: 15px 120px;
  font-size: 20px;
  font-weight: 700;
  background-color: transparent;
  cursor: pointer;
  &:hover {
      color: white;
      background: #000;
      transition: all 1s ease-in-out;
  }
`;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [cartData, setCartData] = useState("");
  const user = useSelector(state => state.user.currentUser);
  useEffect(()=>{
    const cartRes= async ()=>{
      try{
          const respo=await userRequest.get(`cart/find/${user._id}`)
           setData(respo.data._id);
           setCartData(respo.data)
      }catch(err){}
    };
    cartRes();
  },[])
  // console.log(data user._id, setData, setCartData, userRequest);
  // console.log(cartData);
  
  const handleRemoveItem = async (productId) => {
    dispatch(removeProduct(productId));

    try {
      const res = await userRequest.delete(`cart/${data}/${productId}`);
      // console.log('Response:', res);
      setMessage(" Product has been removed from Cart...")
        
  } catch (error) {
      alert('Error removing product to cart:', error);
  }
  };
  useEffect(() => {
    if (message) {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }
}, [message]);

const totalPrice =cartData && cartData.products ? cartData.products.reduce((acc, product) => acc + (product.price * product.quantity), 0) : 0;

return (
  <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
              <TopButton >CONTINUE SHOPPING</TopButton>
              {/* <TopTexts>
                  <TopText><Alert severity="success">{message}</Alert></TopText>
              </TopTexts> */}
              <Link to={"/confirm"}>
              <TopButton type='filled'>CHECKOUT NOW</TopButton>
              </Link>
          </Top>
          <Buttom>
              {cartData && cartData.products && cartData.products.length > 0 ? (
                  <>
                      <Info>
                          {cartData.products.map(product => (
                            <>
                              <Product key={product._id}>
                                  <ProductDetails>
                                      <Image src={product.img} />
                                      <Details>
                                          <ProductName><b>Product: </b>{product.title}</ProductName>
                                          <ProductId><b>Product Descriptions: </b>{product.desc}</ProductId>
                                          <ProductId><b>ID: </b>{product._id}</ProductId>
                                          <ProductColor color={product.color} />
                                          <ProductSize><b>SIZE: </b>{product.size}</ProductSize>
                                          <ProductDelete onClick={() => handleRemoveItem(product._id)}>REMOVE</ProductDelete>
                                      </Details>
                                  </ProductDetails>
                                  <PriceDetails>
                                      <ProductAmountContainer>
                                          {/* <Remove /> */}
                                          <b>Qty: </b>
                                          <ProductAmount>{product.quantity}</ProductAmount>
                                          {/* <Add /> */}
                                      </ProductAmountContainer>
                                      <ProductPrice>Rs.{product.price * product.quantity}/-</ProductPrice>
                                  </PriceDetails>
                              </Product>
                              <br /><Hr /><br />
                              </>
                          ))}
                          
                      </Info>
                      <Summary>
                          <SummaryTitle>Order Summary</SummaryTitle>
                          <SummaryItem>
                              <SummaryItemText>SubTotal</SummaryItemText>
                              <SummaryItemPrice>Rs. {totalPrice}/-</SummaryItemPrice>
                          </SummaryItem>
                          <SummaryItem>
                              <SummaryItemText>Shipping Charge</SummaryItemText>
                              <SummaryItemPrice>Rs. 50/-</SummaryItemPrice>
                          </SummaryItem>
                          <SummaryItem>
                              <SummaryItemText>Discount</SummaryItemText>
                              <SummaryItemPrice>Rs. -50/-</SummaryItemPrice>
                          </SummaryItem>
                          <SummaryItem type="total">
                              <SummaryItemText>Total</SummaryItemText>
                              <SummaryItemPrice>Rs. {totalPrice}/-</SummaryItemPrice>
                          </SummaryItem>
                          <SummaryButton>ORDER NOW</SummaryButton>
                      </Summary>
                  </>
              ) : (
                  <p><Alert severity="info" >Your Cart is Empty...</Alert></p>
              )}
          </Buttom>
      </Wrapper>
      <Footer />
  </Container>
)};
export default Cart;