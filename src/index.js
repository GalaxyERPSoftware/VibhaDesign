import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Bio from './Bio';
import Workshop from './Workshop';
import Shop from './Shop';
import Login from './Login';
import Ragister from './Ragister';
import Addproduct from './ADD/Addproduct';
import Addcategory from './ADD/AddCategory';
import Contact from './Contact';
import Cart from './Cart';
import SingleProduct from './VIEW/SingleProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bio' element={<Bio />} />
        <Route path='/workshop' element={<Workshop />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Creteaccount' element={<Ragister />} />
        <Route path='/addproduct' element={<Addproduct />} />
        <Route path='/addcategory' element={<Addcategory />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/product/:id" element={<SingleProduct />} />

      </Routes>
    </BrowserRouter>

  </>
);

