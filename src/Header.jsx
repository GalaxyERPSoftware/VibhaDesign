import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { TiSocialFacebook } from "react-icons/ti";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { PiBagLight } from "react-icons/pi";
import { Button, Drawer } from 'antd';

const Header = () => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [showSearch, setShowSearch] = useState(false);
    return (
        <>
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
                                    <li>
                                        <Link><IoLogoInstagram className='top-icon' /></Link>
                                    </li>
                                    <li>
                                        <Link><TiSocialFacebook className='top-icon' /></Link>
                                    </li>
                                    <li>
                                        <Link><FaWhatsapp className='top-icon' /></Link>
                                    </li>
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
                                <img src="assets/img/whatsapp.png" alt="" />
                                <ul className="middle-menu">
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/workshop'>Workshop</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="middle-head-child">
                            <div className="middle-head-inner-child">
                                <div className="user-dropdown-wrapper">
                                    <CiUser className='middle-icon' />
                                    <div className="user-dropdown">
                                        <Link to="/Creteaccount">Create Account</Link>
                                        <Link to="/login">Login</Link>
                                        <Link to="">Login</Link>
                                    </div>
                                </div>
                                <PiBagLight className='middle-icon' id='middle-icon' />
                            </div>
                        </div> */}
                        <div className="middle-head-child">
                            <div className="middle-head-inner-child">
                                <div className="user-dropdown-wrapper">
                                    <Link to='/login' className='middle-icon'>  <CiUser /></Link>
                                    {/* <Link to='/cart'> <PiBagLight className='middle-icon' id='middle-icon' /></Link> */}
                                    <Link to=''>
                                        <Button type="primary" onClick={showDrawer}>
                                            <PiBagLight className='middle-icon' id='middle-icon' />
                                        </Button>
                                        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                                            <p>Some contents...</p>
                                            <p>Some contents...</p>
                                            <p>Some contents...</p>
                                        </Drawer> </Link>
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
    )
}

export default Header
