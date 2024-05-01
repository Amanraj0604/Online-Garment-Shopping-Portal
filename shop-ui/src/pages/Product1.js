import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
// import img1 from '../aserts/danim4.jpg';
import { Add, Remove } from '@mui/icons-material';
import { mobile } from '../Responsive';
import { useLocation } from 'react-router-dom';
import { publicRequest, userRequest } from '../requestMethod';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/cartRedux';

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
    flex: 1;
`;
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const Infocontainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`;
const Title = styled.h2`
    font-weight: 200;
`;
const Desc = styled.p`
    margin: 20px 0px;
`;
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
    ${mobile({ fontSize: "20px", fontWeight: 700 })}
`;
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
    display: flex;
    align-items: center;
`;
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;
const FilterColor = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid gray;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    cursor: pointer;
`;
const FilterSizeOptions = styled.option`
    padding: 5px;
`;
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 7px;
    box-shadow: 1px 1px 1px 1px lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
`;
const Button = styled.button`
    padding: 10px;
    font-weight: 700;
    box-shadow: 1px 1px 1px lightgray;
    color: gray;
    background-color: white;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: black;
        transition: all 2s ease-in-out;
    }
`;

const Product1 = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    // const [size, setSize] = useState(Array.isArray(product.size) ? product.size[0] : product.size);
    const user = useSelector(state => state.user.currentUser);
    // const userId=user._id;
    // console.log(userId);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/product/find/" + id);
                setProduct(res.data);
                // console.log("Product Size:", res.data.size); // Log size to console for debugging
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        } else {
            quantity < 10 && setQuantity(quantity + 1);
        }
    };

    const handleColorClick = (selectedColor) => {
        setColor(selectedColor);
    };

    const handleSizeChange = (e) => {
        const selectedSize = e.target.value;
        setSize(selectedSize);
    };

    const handleClick = async () => {
        dispatch(addProduct({ ...product, quantity, color, size }));
        
        const payload = {
            userId: user._id,
            products: [
                {
                    productId: product._id,
                    title: product.title,
                    desc: product.desc,
                    img: product.img,
                    size: size,
                    quantity: quantity,
                    color: color,
                    price: product.price
                }
            ]
        };
    
        // console.log(payload);
    
        try {
            const res = await userRequest.post('cart/',payload);
            console.log('Response:', res);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };
    
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <Infocontainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>Rs. {product.price}/-</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {Array.isArray(product.color) ?
                                product.color.map((c, index) => (
                                    <FilterColor color={c} key={index} onClick={() => handleColorClick(c)} />
                                )) :
                                <FilterColor color={product.color} onClick={() => handleColorClick(product.color)} />
                            }
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <FilterSizeOptions key={s}>{s}</FilterSizeOptions>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove style={{ cursor: 'pointer' }} onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add style={{ cursor: 'pointer' }} onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                    {quantity === 0 && (
                        <p style={{ color: 'red' }}>You can't set quantity as '0'</p>
                    )}
                    {quantity >= 10 && (
                        <p style={{ color: 'red' }}>You can't set quantity as '10' or more than '10'</p>
                    )}
                </Infocontainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product1;
