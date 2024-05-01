import { FavoriteBorder, Share, ShoppingCartCheckout } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

 import { Link } from 'react-router-dom';

const ListContainer = styled.div`
    display: flex;
    padding: 40px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const CardList = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    height: 90%;
    width: 85%;
    padding: 15px;
    border: 2px solid lightgray;

    &:hover {
        width: 90%;
        height:92%;
        box-shadow: 0 4px 8px 0 rgba(81, 79, 79, 0.2), 0 6px 20px 0;
        transition: all 1s ease-in-out;
        border: 2px solid rgb(25, 7, 7);
    }
`;

const ImageList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    height: 300px;
`;

const IconList = styled.div`
    margin-top: -250px;
    margin-left: 7px;
    font-size: 30px;
    color: gray;
    cursor: pointer;
`;

const DetailsList = styled.div`
    margin-top: 15px;
`;

const DetailsText = styled.span`
    font-size: 15px;
    color: rgb(105, 104, 104);
    font-weight: 500;
`;

const Price = styled.h2`
    font-size: 20px;
    color: rgb(37, 37, 37);
`;

const Button = styled.button`
    border: 1px solid gray;
    padding: 10px;
    background-color: white;
    width: 40%;
    cursor: pointer;
    color: rgb(9, 9, 9);
    font-weight: 600;

    &:hover {
        color: white;
        background: #000;
        transition: all 1s ease-in-out;
    }
`;

const Product = ({ item }) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: item.title,
                    text: item.desc,
                    url: window.location.href
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.log('Web share API not supported');
            // Fallback to other sharing methods if necessary
        }
    };
    return (
        <ListContainer>
            <CardList>
                <ImageList>
                <Image src={item.img ? item.img : "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/t/v/o/l-st1-vebnor-original-imagn69nznqeege4.jpeg?q=70"} alt="" />                    <IconList>
                        <Share onClick={handleShare} />
                        {/* <FavoriteBorder /> */}
                    </IconList>
                </ImageList>
                <DetailsList>
                    <DetailsText>{item.title}</DetailsText><br />
                    <DetailsText>{item.desc}</DetailsText>
                    <Price>Rs. {item.price}/-</Price>
                </DetailsList>
                <Link to={`/product/${item._id}`}>
                    <Button>OPEN</Button>
                </Link>

            </CardList>
        </ListContainer>
    );
};

export default Product;

