import { AccountCircle, ArrowRight, Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mobile } from '../Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../redux/userSlice";
import { userRequest } from '../requestMethod';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  background: #000;
  color: white;
  ${mobile({ fontSize: "12px", background: "white", color: "black" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "10px", marginLeft: "10px" })};
`;

const LogoutButton = styled(MenuItem)`
  font-size:20px;
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user.currentUser);
  const [count, setCount] = useState(null);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    const cartRes = async () => {
      try {
        const respo = await userRequest.get(`cart/find/${user._id}`);
        setCount(respo.data);
      } catch (err) {}
    };
    cartRes();
  }, [user]);

  let arraySize = 0;
  if (count && count.products) {
    arraySize = count.products.length;
  }

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Construct the URL with search query
    const url = `/products/${encodeURIComponent(searchQuery)}`;
    // Redirect the user to the search results page
    window.location.href = url;
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language><ArrowRight/></Language>
          <SearchContainer onSubmit={handleSearch}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
            />
            <Search style={{ color: "gray", fontSize: 16 }} type="submit" />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>𝔾𝕖𝕖𝕥𝕒𝕟𝕛𝕒𝕝𝕚 ℝ𝕖𝕒𝕕𝕪𝕞𝕒𝕕𝕖</Logo>
        </Center>
        <Right>
          {user ? (
            <>
              <h3>{user.username}</h3>
              <Link to={"/account"}>
                <LogoutButton>
                  <AccountCircle />
                </LogoutButton>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={arraySize} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
