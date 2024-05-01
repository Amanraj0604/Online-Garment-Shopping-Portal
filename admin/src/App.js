import './App.css';
import Sidebar from './componant/sidebar/Sidebar';
import Topbar from './componant/topbar/Topbar';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { useSelector } from "react-redux";

function App() {
  const isAdmin = useSelector((state) => state.user.currentUser) || "Aman";
// console.log(isAdmin);
const user=isAdmin.isAdmin;
  return (
    <Router>
      {(user === true) ?<Topbar />:<Login/>}
      <div className="container">
        {user && <Sidebar />}
        <Routes>
          <Route path="/" element={user ? <Home /> :" "} />
          <Route path="/user" element={user ? <UserList /> : <Login />} />
          <Route path="/user/:userId" element={user ? <User /> : <Login />} />
          <Route path="/newUser" element={user ? <NewUser /> : <Login />} />
          <Route path="/products" element={user ? <ProductList /> : <Login />} />
          <Route path="/product/:productId" element={user ? <Product /> : <Login />} />
          <Route path="/newproduct" element={user ? <NewProduct /> : <Login />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
