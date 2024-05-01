import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components'
import { sliderItem } from '../data';
import { useState , useEffect } from 'react';
import { mobile } from '../Responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    overflow:hidden;
    position: relative;
`;
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: rgb(255, 247, 247);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0;
    bottom: 0;
    margin:auto; 
    left:${props => props.direction === "left" && "10px"};
    right:${props => props.direction === "right" && "10px"};
    cursor:pointer;
    opacity:0.5;
    z-index:2;
`;
const Wrapper = styled.div`
    height:100%;
    display:flex;
    transition: all 1.5s ease-in-out;
    transform:translateX(${props=>props.slideIndex * -100}vw);
`;
const Slide = styled.div`
    width:100vw;
    height:100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg}
`;

const ImgContainer = styled.div`
    height:100%;
    flex:1;
    ${mobile({display:"none"})};
`;
const Image = styled.img`
    height:80%;
    margin-left: 20%;
`;

const InfoContainer = styled.div`
    padding:50px;
    flex:1;
`;

const Title = styled.h1`
    font-size:70px;
    ${mobile({fontSize:"50px"})};
`;

const Desc = styled.p`
    margin:50px 0px;
    font-size:20px;
    font-weight:500;
    letter-spacing:3px;
`;

const Buttonn = styled.button`
    padding:10px;
    font-size:20px;
    background-color:gray;
    color:black
    border:2px solid black
    cursor:pointer;
    &:hover{
        color: white;
        background: #000;
        transition: all 1s ease-in-out;
      }
`;

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if(direction==="left")
        {
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2)
        }
        else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0 )
        }
    };

    const autoSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
    };

    useEffect(() => {
        const interval = setInterval(autoSlide, 5000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <KeyboardArrowLeft />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItem.map(item=>(
                <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img} />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <Link to={"/products/man"}>
                        <Buttonn>SHOP NOW</Buttonn>
                        </Link>
                    </InfoContainer>
                </Slide>
                ))};
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <KeyboardArrowRight />
            </Arrow>
        </Container>
    )
}

export default Slider
