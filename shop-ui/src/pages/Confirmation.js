import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethod';
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { lightGreen } from '@mui/material/colors';


// Styled components
const Container = styled.div`
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
    color: #333;
    text-align: center;
`;

const OrderSummaryContainer = styled.div`
    border-top: 1px solid #ccc;
    margin-top: 20px;
    padding-top: 20px;
`;

const OrderSummaryHeading = styled.h3`
    margin-bottom: 10px;
    color: #555;
`;

const AddressContainer = styled.div`
    margin-bottom: 20px;
`;

const AddressHeading = styled.h3`
    margin-bottom: 10px;
    color: #555;
`;

const EditButton = styled.button`
    background-color: ${({ primary }) => (primary ? '#0056b3' : '#f5f6f8')};
    color: ${({ primary }) => (primary ? 'white' : '#080808')};
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        background-color: ${({ primary }) => (primary ? '#0056b3' : 'black')};
        color: ${({ primary }) => (primary ? 'white' : 'white')};
    }
`;

const PaymentOptionsContainer = styled.div`
    margin-top: 20px;

    & > * {
        margin-left: 10px;
    }
`;

const PaymentOptionsHeading = styled.h3`
    margin-bottom: 10px;
    color: #555;
`;

const PlaceOrderButton = styled.button`
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #218838;
    }
`;
const OrderContainer=styled.div`
    padding:20px;
`;
const OrderItem=styled.div`
display:flex;
align-item:center;
margin-bottom:20px;
`;
const OrderImg=styled.img`
width:100px;
height:100px;
margin-right:20px;
`;
const OrderTitle=styled.h3`
    width:100%
    margin:20px;
`;
const Orderdetails=styled.p`

`;

// React component
const Confirmation = () => {
    const user = useSelector(state => state.user.currentUser);
    const [cartData, setCartData] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false); 

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await userRequest.get(`address/${user._id}`);
                setAddress(response.data[0]);
            } catch (error) {
                setMessage('Error fetching address: ' + error.message);
            }
        };

        fetchAddress();
    }, [user._id]);

    useEffect(() => {
        const cartRes = async () => {
            try {
                const respo = await userRequest.get(`cart/find/${user._id}`)
                setCartData(respo.data)
            } catch (err) {
                setMessage("Something went wrong fetching cart data...");
            }
        };
        cartRes();
    }, [user._id, setCartData]);
    // console.log();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 5);

    const formattedTomorrow = `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow.getDate().toString().padStart(2, '0')}`;

    const totalPrice = cartData && cartData.products ? cartData.products.reduce((acc, product) => acc + (product.price * product.quantity), 0) : 0;

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const handleClose = async () => {
         await userRequest.delete(`cart/delete/${cartData._id}`);
        setOpen(false); 
    };
    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId: user._id,
                products: cartData.products,
                amount: totalPrice,
                address: address,
                expectedDeliveryDate: formattedTomorrow,
                pay: paymentMethod
            };

            const response = await userRequest.post('order/', orderData);
            if (response.status === 200) {
                setMessage('Order placed successfully...');
            } else {
                setMessage('Something went wrong...');
            }
            setOpen(true); // Open the dialog
        } catch (error) {
            setMessage('Something went wrong: ' + error.message);
            setOpen(true); // Open the dialog
        }
    };

    return (
        <Container>
            <Heading>Order Confirmation</Heading>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle style={{background:"lightGreen",color:"green"}}>{message.includes('success') ? 'Success' : 'Error'}</DialogTitle>
                <DialogContent>
                    <p style={{color:'green',fontWeight:"700"}}>{message}</p>
                </DialogContent>
                <DialogActions><Link to={"/"}>
                    <Button onClick={handleClose} color="primary" style={{color:"gray"}}>
                        Close
                    </Button>
                    </Link>
                </DialogActions>
            </Dialog>
            <AddressContainer>
                <AddressHeading>Shipping Address</AddressHeading>
                <p>
                    <h4>{address.name}</h4>{address.phoneNo}<br />
                    {address.flatNo}&nbsp;{address.locality}&nbsp;{address.city}&nbsp;{address.state}&nbsp;{address.landmark}<br />
                    {address.addresstype}{address.pincode}<br />
                    
                </p>
                <Link to="/edit">
                    <EditButton primary>Edit Address</EditButton>
                </Link>
            </AddressContainer>
            <OrderSummaryContainer>
                <OrderSummaryHeading>Expected Delivery</OrderSummaryHeading>
                <p> Date: <h4>{formattedTomorrow}</h4></p> 
            </OrderSummaryContainer>
            
            <OrderSummaryContainer>
                <OrderSummaryHeading>Order Summary</OrderSummaryHeading>
                {cartData.products && cartData.products.map(product => (
                    <OrderContainer key={product.id}>
                        <OrderItem>
                            <OrderImg src={product.img}/>
                            <OrderTitle>{product.title}</OrderTitle>
                            <Orderdetails><h4>Rs.: {product.price}/-</h4></Orderdetails>
                            <Orderdetails><h4>Qty: {product.quantity} </h4></Orderdetails>
                            <Orderdetails><h4>Size: {product.size}</h4></Orderdetails>
                            <Orderdetails><h4>Desc: {product.desc}</h4></Orderdetails>
                        </OrderItem>
                        
                    </OrderContainer>
                ))}
                <hr /><br />
                <OrderTitle><h2>&nbsp;Total:</h2>&nbsp;&nbsp;&nbsp;{totalPrice} /-</OrderTitle><br />
                <hr />
                {/* {message && <Alert variant="filled" severity={message.includes('success') ? 'success' : 'error'}>{message}</Alert>} */}
            </OrderSummaryContainer>
            <PaymentOptionsContainer>
                <PaymentOptionsHeading>Payment Options</PaymentOptionsHeading>
                <input type="radio" id="cashOnDelivery" name="paymentMethod" value="cashOnDelivery" onChange={handlePaymentMethodChange} />
                <label htmlFor="cashOnDelivery">Cash on Delivery</label><br />
                <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" onChange={handlePaymentMethodChange} />
                <label htmlFor="creditCard">Pay</label><br />
            </PaymentOptionsContainer>
            <PlaceOrderButton onClick={handlePlaceOrder}>Place Order</PlaceOrderButton>
            
        </Container>
    );
}

export default Confirmation;
