import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoInstagram, IoBagSharp } from "react-icons/io5";
import { TiSocialFacebook } from "react-icons/ti";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { PiBagLight } from "react-icons/pi";
import { Button, Drawer } from 'antd';
import axios from 'axios';
import { DeleteOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { API_BASE_URL } from './config';

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/getcartdetails`, {
                    Customer_ID: user.UserID
                });
                if (response.data && response.data.CartDetails) {
                    setCartData(response.data.CartDetails);
                }
            } catch (error) {
                console.error('Error fetching cart details:', error);
            }
        };

        if (user) {
            fetchCartDetails();
        }
    }, [user]);

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.post(`${API_BASE_URL}/api/deletecartitem`, {
                Cart_ID: itemId
            });
            setCartData(cartData.filter(item => item.Cart_ID !== itemId));
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        try {
            await axios.post(`${API_BASE_URL}/api/updatecartdetails`, {
                Cart_ID: itemId,
                Quantity: newQuantity
            });
            setCartData(cartData.map(item => 
                item.Cart_ID === itemId ? { ...item, Quantity: newQuantity } : item
            ));
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="all-main">
                <div className="top-head">
                    <div className="container">
                        <div className="top-head-inner-main">
                            <div className="top-head-child">
                                <div className="top-head-inner-child">
                                    <ul className="top-menu">
                                        <li><Link to='/bio'>About</Link></li>
                                        <li><Link to='/contact'>Contact</Link></li>
                                        <li><Link>FAQ</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="top-head-child">
                                <div className="top-head-inner-child">
                                    <ul className="top-menu">
                                        <li><Link><IoLogoInstagram className='top-icon' /></Link></li>
                                        <li><Link><TiSocialFacebook className='top-icon' /></Link></li>
                                        <li><Link><FaWhatsapp className='top-icon' /></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="middle-head-main">
                    <div className="container">
                        <div className="middle-head-inner-main">
                            <div className="middle-head-child">
                                <div className="middle-head-inner-child">
                                    <IoIosSearch
                                        className='middle-icon'
                                        onClick={() => setShowSearch(true)}
                                    />
                                </div>
                            </div>
                            <div className="middle-head-child">
                                <div className="middle-head-inner-child">
                                    <ul className="middle-menu">
                                        <li><Link to='/bio'>Portfolio</Link></li>
                                        <li><Link to='/shop'>Shop</Link></li>
                                    </ul>
                                    <img src="assets/img/logo.png" alt="logo" />
                                    <ul className="middle-menu">
                                        <li><Link to='/'>Home</Link></li>
                                        <li><Link to='/workshop'>Workshop</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="middle-head-child">
                                <div className="middle-head-inner-child">
                                    <div className="user-dropdown-wrapper">
                                        <Link to={user ? '/myaccount' : '/login'} className='middle-icon'>
                                            <CiUser />
                                        </Link>

                                        <Link to="">
                                            <Button type="primary" onClick={showDrawer}>
                                                <PiBagLight className='middle-icon' id='middle-icon' />
                                            </Button>

                                            <Drawer title="My Cart" onClose={onClose} open={open}>
                                                {cartData.length === 0 ? (
                                                    <p>Your cart is empty.</p>
                                                ) : (
                                                    cartData.map((item, index) => (
                                                        <div className="cart-item" key={index}>
                                                            <img
                                                                src={`${API_BASE_URL}${item.Product_Img}`}
                                                                alt={item.Product_Name}
                                                                className="cart-img"
                                                            />
                                                            <div className="cart-info">
                                                                <p className="cart-title">{item.Product_Name}</p>
                                                                <p className="cart-price">₹{item.Rate || 0}</p>
                                                                <div className="cart-qty">
                                                                    <button onClick={() => handleUpdateQuantity(item.Cart_ID, item.Quantity - 1)}>-</button>
                                                                    <span>{item.Quantity}</span>
                                                                    <button onClick={() => handleUpdateQuantity(item.Cart_ID, item.Quantity + 1)}>+</button>
                                                                </div>
                                                            </div>

                                                            <div className="cart-actions">
                                                                <RiDeleteBin6Line
                                                                    className="delete-icon"
                                                                    style={{ cursor: 'pointer', color: '#2F4157' }}
                                                                    onClick={() => handleDeleteItem(item.Cart_ID)}
                                                                />
                                                                <p className="cart-subtotal">₹{item.TotalAmount}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </Drawer>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showSearch && (
                    <div className="search-overlay">
                        <div className="search-box">
                            <input type="text" placeholder="Search" />
                            <IoIosSearch className="search-icon" />
                            <span className="close-icon" onClick={() => setShowSearch(false)}>×</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="bottom-main">
                <div className="container">
                    <div className="bottom-inner-main">
                        <div className="bottom-child">
                            <div className="bottom-inner-child">
                                <p className='botton-one'>CUSTOM RESIN ART PIECES</p>
                                <p className='botton-two'>Transforming Memories into Timeless Resin Art</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;



















