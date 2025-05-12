import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="footer-main">
                <div className="conatiner">
                    <div className="footer-inner-main">
                        <div className="footer-child">
                            <div className="footer-inner-child">
                                <img src="assets/img/footer3.png" alt="" />
                            </div>
                        </div>
                        <div className="footer-child">
                            <div className="footer-inner-child">
                                <div className="footer-box">
                                    <p className='footer-one'>GET AROUND</p>
                                    <ul className="footer-menu">
                                        <li><Link to='/'>Home</Link></li>
                                        <li><Link to='/bio'>Portfolio</Link></li>
                                        <li><Link to='/contact'>Contact</Link></li>
                                        <li><Link to='/shop'>Shop</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="footer-child">
                            <div className="footer-inner-child">
                                <div className="footer-box">

                                    <p className='footer-one'>OUR SERVICES</p>
                                    <ul className="footer-menu">
                                        <li><Link to='/bio'>About</Link></li>
                                        <li><Link to='/contact'>Custom orders</Link></li>
                                        <li><Link to='/contact'>Learn from us</Link></li>
                                        <li><Link to='/contact'>Reviews</Link></li>
                                        <li><Link to='/contact'>Legal</Link></li>
                                        <li><Link to='/contact'>Gallery</Link></li>
                                        <li><Link to='/contact'>Shipping & returns</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                        <div className="footer-child">
                            <div className="footer-inner-child">
                                <div className="footer-box">
                                    <p className='footer-one'>ENQUIRE NOW</p>
                                    <div className="footer-two">
                                        <label htmlFor="" className='footer-three'>Name</label>
                                        <input type="text" name="" id="" className='footer-four' />
                                    </div>
                                    <div className="footer-two">
                                        <label htmlFor="" className='footer-three'>Email</label>
                                        <input type="email" name="" id="" className='footer-four' />
                                    </div>
                                    <div className="footer-two">
                                        <label htmlFor="" className='footer-three'>Message</label>
                                        <input type="text" name="" id="" className='footer-four' />
                                    </div>
                                    <div className="footer-btn">
                                        <Link className='footer-five'>SUBMIT</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
