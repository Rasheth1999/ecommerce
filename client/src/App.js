import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import ForgetPassword from './pages/ForgetPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import MyOrder from './pages/MyOrder';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ViewOrderList from './pages/ViewOrderList';

const App = () => {
  // const user = true;
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/products' element={<ProductList />}></Route>
          <Route path='/products/:category' element={<ProductList />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/product/:id' element={<Product />}></Route>
          <Route path='/products/tablet/product/:id' element={<Product />}></Route>
          <Route path='/products/mobile/product/:id' element={<Product />}></Route>
          <Route path='/products/flip/product/:id' element={<Product />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/forget' element={<ForgetPassword />}></Route>
          <Route path='/checkout' element={<CheckOut />}></Route>
          <Route path='/myorder' element={<MyOrder />}></Route>
          <Route path='/myorder/vieworder/:id' element={<ViewOrderList />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
