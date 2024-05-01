import Home from "./pages/Home";
import Product1 from "./pages/Product1";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Confirmation from "./pages/Confirmation";


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Edit from "./pages/Edit";
import { useSelector } from "react-redux";
import Account from "./pages/Account/Account";
import Products from "./components/Products";


function App() {
  let user=false
  const usera = useSelector((state) => state.user.currentUser);
  if(usera)
  {
    user=true
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={user ?<Product1 />:<Login/>} />
        <Route path="/cart" element={user ? <Cart /> : <Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/account" element={user ? <Account /> : <Home />} />
        <Route path="/edit" element={user ? <Edit /> : <Login />} />
        <Route path="/confirm" element={user ? <Confirmation /> : <Login />} />
        <Route path="/product" element={<Products/>} />
      </Routes>
    </Router>

  );
}

export default App;

