import styled from "styled-components"
import { popularProducts } from "../data";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


const Container = styled.div`
display:flex;
padding:20px;
flex-wrap: wrap;
justify-content: space-between;
`;
const Products = ({ cat, filters, sort }) => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');
  // console.log(cat,filters,sort);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = searchQuery
          ? `http://localhost:5000/shop/product?search=${encodeURIComponent(searchQuery)}`
          : 'http://localhost:5000/shop/product';
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {

    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:5000/shop/product/?category=${cat}` :
          "http://localhost:5000/shop/product"
        );
        // console.log(res);
        setProducts(res.data);
      }
      catch (err) {

      }
    }
    getProducts();
  }, [cat]);
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
         Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [products, cat, filters])

  useEffect(()=>{
   if((sort==="newest"))
   {
    setFilteredProducts(prev=>
      [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
   }else if((sort==="asc"))
   {
    setFilteredProducts(prev=>
      [...prev].sort((a,b)=>a.price -b.price)
      )
   }
   else if (sort === "desc") {
    setFilteredProducts(prev=>
      [...prev].sort((a, b) => b.price - a.price)
    )
  }else{ 
    setFilteredProducts(prev=>
      [...prev].sort((a,b)=>b.createdAt -a.createdAt)
      )
   }
  },[sort])
  return (
    <Container>
      {cat 
      ? filteredProducts.map((item) => 
        <Product item={item} key={item.id} />)
        :products
        .slice(0,20)
        .map((item)=><Product item={item} key={item.id}/>)
      };
    </Container>
  )
}

export default Products
