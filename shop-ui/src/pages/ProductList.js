import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer'
import { mobile } from '../Responsive';
import { useLocation } from 'react-router-dom';

const Container = styled.div`

`;
const Title = styled.h1`
margin:20px;
`;
const FilterContainer = styled.div`
    display:flex;
    justify-content: space-between;
`;
const Filter = styled.div`
margin:20px;
${mobile({width:"0px 2px",display:"flex",flexDirection:"column"})}
`;

const FilterText = styled.span`
font-size:20px;
font-weight:600;
margin-right:20px;
${mobile({marginRight:"0px"})}
`;
const Select = styled.select`
    padding:10px;
    margin-right:20px;
    ${mobile({margin:"10px 0px"})}
`;
const Option = styled.option`
${mobile({width:"55%"})}
`;
const ProductList = () => {
    const location=useLocation();
    // console.log(location.pathname.split("/")[2]);
    const cat=location.pathname.split("/")[2];
    const [filters,setFilters]=useState({});
    const [sort,setSort]=useState("Newest");

    const handleFilters=(e)=>{
        const value=e.target.value;
        setFilters({
            ...filters,
            [e.target.name]:value,

        });
    };
    console.log(filters);
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{cat.toUpperCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Prodcts:</FilterText>
                    Color &nbsp;&nbsp;
                    <Select name="color" onChange={handleFilters}>
                        {/* <Option disabled >
                            color
                        </Option> */}
                        {/* <Option >All Colors</Option> */}
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>green</Option>
                        <Option>blue</Option>
                        <Option>gray</Option>
                    </Select>
                    Size &nbsp;&nbsp;
                    <Select name="size" onChange={handleFilters}>
                        {/* <Option disabled >
                            Size
                        </Option> */}
                        {/* <Option value="M">All Sizes</Option> */}
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                        <Option>XXL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e)=>setSort(e.target.value)}>
                        <Option value="newest" >
                            Newest
                        </Option>
                        <Option value="asc">Price Low to high</Option>
                        <Option value="desc">Price High to low</Option>
                        <Option value="relevence">Relevance</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList
