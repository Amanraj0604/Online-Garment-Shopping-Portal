import React, { useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../requestMethod';
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
// import { Container, Form, FormGroup, Label, Input, RadioGroup, RatioInput, RatioLabel, SaveButton } from 'reactstrap';
// Styled components
const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
`;

const Form = styled.form`
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: calc(100% - 20px);
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SaveButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const RadioGroup = styled.div`
    margin-bottom: 15px;

    & > input[type="radio"] {
        margin-right: 5px;
        vertical-align: middle;
    }

    & > label {
        vertical-align: middle;
    }
`;
const RatioInput=styled.input`
margin-left:10px;
`;
const RatioLabel=styled.label`
margin-left:10px;
`;
// React component

const Edit = () => {
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [name, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [locality, setLocality] = useState("");
    const [flat, setFlat] = useState("");
    const [landmark, setLandmark] = useState("");
    const [addressType, setAddressType] = useState("");
    const [open, setOpen] = useState(false); 
    const [message, setMessage] = useState(""); 
    const user = useSelector(state => state.user.currentUser);
    

    const handlePincodeChange = (e) => {
        const newPincode = e.target.value;
        if (/^\d{0,6}$/.test(newPincode)) {
            setPincode(newPincode);
        }
        else{
            alert("invalid pin")
        }
        // setPincode(newPincode);
        // Fetch city and state using API (Replace the API URL with the actual one)
        fetch(`https://api.postalpincode.in/pincode/${newPincode}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data[0].Status === "Success") {
                    setCity(data[0].PostOffice[0].Division);
                    setState(data[0].PostOffice[0].State);
                } else {
                    setCity("");
                    setState("");
                }
            })
            .catch(error => {
                alert('Error fetching data:', error);
            });
    };

    const handlePhoneChange = (e) => {
        const newPhone = e.target.value;
        if (/^\d{0,10}$/.test(newPhone)) {
            setPhone(newPhone);
        } else {
            alert('Invalid phone number. Please enter a 10-digit phone number.');
        }
    };
    const handleClose = async () => {
        // await userRequest.delete(`cart/delete/${cartData._id}`);
       setOpen(false); 
   };
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            // Prepare the request payload
            const formData = {
                pincode,
                city,
                state,
                name,
                phone,
                locality,
                flat,
                landmark,
                addressType
            };
            console.log(formData);
            // Send PUT request to the API endpoint
             await userRequest.put(`address/${user._id}`, formData);
            setOpen(true);
            setMessage('Address updated..');
        } catch (error) {
            setMessage('Error updating address:', error);
            setOpen(true);
        }
    };

    return (
        <Container>
            <h2>Edit Customer Details</h2>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle style={{background:"lightGreen",color:"green"}}>Success</DialogTitle>
                <DialogContent>
                    <p style={{color:'green',fontWeight:"700"}}>{message}</p>
                </DialogContent>
                <DialogActions><Link to={"/cart"}>
                    <Button onClick={handleClose} color="primary" style={{color:"gray"}}>
                        Close
                    </Button>
                    </Link>
                </DialogActions>
            </Dialog>
            <Form className="customer-form" onSubmit={handleSave}>
                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <FormGroup>
                        <Label htmlFor="customerName">Name:</Label>
                        <Input type="text" id="customerName" name="customerName" value={name} onChange={(e) => setCustomerName(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="phone">Phone No (+91):</Label>
                        <Input type="tel" id="phone" name="phone" pattern="[0-9]{10}" value={phone} onChange={handlePhoneChange} required />
                    </FormGroup>
                </div>
                <div className="address-info">
                    <h3>Address Information</h3>
                    <FormGroup>
                        <Label htmlFor="pincode">Pincode:</Label>
                        <Input type="text" id="pincode" name="pincode" value={pincode} onChange={handlePincodeChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="city">City:</Label>
                        <Input type="text" id="city" name="city" value={city} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="state">State:</Label>
                        <Input type="text" id="state" name="state" value={state} readOnly />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="locality">Locality:</Label>
                        <Input type="text" id="locality" name="locality" value={locality} onChange={(e) => setLocality(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="flat">Flat No/Building Name:</Label>
                        <Input type="text" id="flat" name="flat" value={flat} onChange={(e) => setFlat(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="landmark">Landmark:</Label>
                        <Input type="text" id="landmark" name="landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                    </FormGroup>
                    <RadioGroup>
                        <Label>Type of Address:</Label>
                        <RatioInput type="radio" id="home" name="addressType" value="home" checked={addressType === "home"} onChange={() => setAddressType("home")} />
                        <RatioLabel htmlFor="home">Home</RatioLabel>
                        <RatioInput type="radio" id="office" name="addressType" value="office" checked={addressType === "office"} onChange={() => setAddressType("office")} />
                        <RatioLabel htmlFor="office">Office</RatioLabel>
                    </RadioGroup>
                </div>
                <SaveButton type="submit">Save</SaveButton> 
            </Form>
        </Container>
    );
}

export default Edit;
