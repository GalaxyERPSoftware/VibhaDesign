import React, { useState } from 'react'
import Header from './Header'
import Swiper from './Swiper1'
import Category from './Category';
import { FaRegClock } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import Client from './Client';
import { Link } from 'react-router-dom';
import Slider1 from './Slider1';
import Selling from './Selling';

const Home = () => {
    return (
        <>
            {/* header part start  */}
            <Header />
            {/* header part end  */}

            {/* home page start  */}
            <div className="banner-main">
                <div className="banner-inner-main">
                    <div className="banner-child">
                        <div className="banner-inner-child">
                            <img src="assets/img/banner1.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* home page end  */}

            {/* swiper part start  */}
            <Swiper />
            {/* swiper part end  */}

            {/* about part start  */}
            <div className="about-main">
                <div className="container">
                    <div className="about-inner-main">
                        <div className="about-child">
                            <div className="about-inner-child">
                                <img src="assets/img/about.png" alt="" />
                            </div>
                        </div>
                        <div className="about-child">
                            <div className="about-inner-child">
                                <p className='about-one'>About VV Design Studio</p>
                                <p className='about-two'>Welcome to our creative corner, where imagination meets craftsmanship! We specialize in <span className='about-three'>Resin Art, Glass Paintings, Pyrography, and Alcohol Ink Art—</span> each piece thoughtfully handcrafted to bring beauty and uniqueness into your space. Our passion lies in transforming simple materials into stunning works of art that spark emotion and elevate everyday surroundings.</p>
                                <div className="about-btn">
                                    <p className='about-four'>Explore collection </p>
                                    <img src="assets/img/arrow.png" alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* about part end  */}

            {/* bio part start  */}
            <div className="bio-main">
                <div className="container">
                    <div className="bio-inner-main">
                        <div className="bio-child">
                            <div className="bio-inner-child">
                                <p className='bio-one'>Artist Bio</p>
                                <p className='bio-two'>It is a long established fact that a reader by the readable content of a looking <br />layout.The point of using Lorem opposed to using  reader by the readable <br /> content of a looking layout.The point of using Lorem opposed to using g <br /> established fact that a reader by the readable content of a looking layout.The <br /> point of using Lorem opposed to using  reader by the readable content of a <br />looking layout.</p>
                                <div className="bio-btn">
                                    <Link to='/bio' className='bio-three'> more info</Link>
                                    <img src="assets/img/arrow.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="bio-child">
                            <div className="bio-inner-child">
                                <img src="assets/img/bio2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* bio part end  */}

            {/* video part start  */}
            <div className="video-main">
                <video autoPlay muted loop id='myvideo'>
                    <source src="assets/video/video1.mp4" />
                </video>
                <div className="video-child">
                    <p className='video-one'>Every piece of art tells a different tale with memories</p>
                    <p className='video-two'>That's what makes handcrafted art so beautiful</p>

                </div>
            </div>
            {/* video part end  */}
            {/* category part start  */}

            <Category />
            {/* category part end */}
            {/* selling part start  */}
            <Selling />

            {/* selling part end  */}
            {/* workshop part start  */}

            <div className="work-main">
                <div className="container">
                    <div className="work-inner-main">
                        <div className="work-child">
                            <div className="work-inner-child">
                                <img src="assets/img/work1.png" alt="" />
                            </div>
                        </div>
                        <div className="work-child">
                            <div className="work-inner-child">
                                <p className='work-one'>Workshop Detail</p>
                                <p className='work-two'>It is a long established fact that a reader by the readable content of a looking layout.The point of using Lorem opposed to using  reader by the readable content of a looking .</p>
                                <div className="work-box">
                                    <div className="work-item">
                                        <FaRegClock className='work-icon' />
                                        <div className="work-text">
                                            <p className='work-three'>Time</p>
                                            <p className='work-four'>8:30am - 11:00am</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-box">
                                    <div className="work-item">
                                        <FaCalendarAlt className='work-icon' />
                                        <div className="work-text">
                                            <p className='work-three'>Date</p>
                                            <p className='work-four'>12,March,2025</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-box">
                                    <div className="work-item">

                                        <IoLocationSharp className='work-icon' />
                                        <div className="work-text">

                                            <p className='work-three'>Loaction</p>
                                            <p className='work-four'>123,anywhere st,Gujarat</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="work-btn">
                                    <p className='work-five'>Register Now!</p>
                                    <img src="assets/img/arrow.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* workshop part end  */}
            {/* slider1 part start */}
            <Slider1 />
            {/* slider1 part end  */}

            {/* client part start  */}
            <Client />
            {/* client part end  */}


        </>
    )
}

export default Home
