import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Contact from './pages/contact/Contact';
import FeedBack from './pages/feedBack/FeedBack';
import Home from './pages/home/Home';
import NewProduct from './pages/newProduct/NewProduct';
import NewUser from './pages/newUser/NewUser';
import MyOrder from './pages/orderList/orderList';
import Payment from './pages/payment/Payment';
import Product from './pages/product/Product';
import ProductList from './pages/productList/ProductList';
import User from './pages/user/User';
import UserList from './pages/userList/UserList';

function App() {
  return (
    <Router>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/users' element={<UserList />}></Route>
          <Route path='/user/:id' element={<User />}></Route>
          <Route path='/newUser' element={<NewUser />}></Route>
          <Route path='/products' element={<ProductList />}></Route>
          <Route path='/products/:category' element={<ProductList />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/product/:id' element={<Product />}></Route>
          <Route path='/newproduct' element={<NewProduct />}></Route>
          <Route path='/orderList' element={<MyOrder />}></Route>
          <Route path='/feedBack' element={<FeedBack />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
