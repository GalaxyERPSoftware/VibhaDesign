import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // import Toastify
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import { API_BASE_URL } from './config';

const Contect = () => {
    const [formData, setFormData] = useState({
        Contact_Name: '',
        Contact_Email: '',
        Phone_Number: '',
        Contact_Message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!formData.Contact_Name || !formData.Contact_Email || !formData.Phone_Number || !formData.Contact_Message) {
    //         toast.error("Please fill out all fields.");
    //         return;
    //     }

    //     try {
    //         await axios.post('http://192.168.1.9:8088/api/contact', formData);
    //         toast.success('Thank you for contacting!');
    //         setFormData({
    //             Contact_Name: '',
    //             Contact_Email: '',
    //             Phone_Number: '',
    //             Contact_Message: ''
    //         });
    //     } catch (error) {
    //         toast.error('Failed to send message.');
    //         console.error(error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format regex
        const phoneRegex = /^[0-9]{10}$/; // 10-digit phone format

        if (!formData.Contact_Name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        if (!formData.Contact_Email.trim()) {
            toast.error("Please enter your email.");
            return;
        }

        if (!emailRegex.test(formData.Contact_Email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!formData.Phone_Number.trim()) {
            toast.error("Please enter your phone number.");
            return;
        }

        if (!phoneRegex.test(formData.Phone_Number)) {
            toast.error("Please enter a valid 10-digit phone number.");
            return;
        }

        if (!formData.Contact_Message.trim()) {
            toast.error("Please enter your message.");
            return;
        }


        try {
            await axios.post(`${API_BASE_URL}/api/contact`, formData);
            toast.success('Thank you for contacting!');
            setFormData({
                Contact_Name: '',
                Contact_Email: '',
                Phone_Number: '',
                Contact_Message: ''
            });
        } catch (error) {
            toast.error('Failed to send message.');
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <div className="contect-page-main">
                <div className="container">
                    <div className="contect-page-inner-main">
                        <div className="contect-page-flex-main">
                            <div className="contect-page-child">
                                <div className="contect-page-child-inner-main">
                                    <img src="assets/img/contact1.png" alt="Contact" />
                                </div>
                            </div>
                            <div className="contect-page-child">
                                <div className="contect-page-child-inner-main">
                                    <h2>let's talk</h2>
                                    <p>Have a question about a <button type="button" className="link-button">custom commission</button> or my 1-on-1 resin coaching services?
                                        Whether you're interested in creating a bespoke resin piece, booking a workshop, or just need guidance, I'd love to hear from you!</p>
                                    <p>Have a question about a <button type="button" className="link-button">custom commission</button> or my 1-on-1 resin coaching services?
                                        Whether you're interested in creating a bespoke resin piece, booking a workshop, or just need guidance, I'd love to hear from you!</p>
                                    <p>Have a question about a <button type="button" className="link-button">custom commission</button> or my 1-on-1 resin coaching services?
                                        Whether you're interested in creating a bespoke resin piece, booking a workshop, or just need guidance, I'd love to hear from you!</p>

                                    <p>Fill out the form below or send an email to <a href="mailto:rengin@resinbyrengin.com">rengin@resinbyrengin.com</a>, and I'll get back to you as soon as possible.</p>

                                    <p>Your ideas and questions are always welcome — I'm excited to connect and bring your vision to life!</p>

                                    <p><strong>Rengin.</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contect-wrapper">
                        <form onSubmit={handleSubmit} className="contect-form">
                            <div className="contect-row">
                                <div className="contect-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="Contact_Name"
                                        value={formData.Contact_Name}
                                        onChange={handleChange}

                                    />
                                </div>
                                <div className="contect-group">
                                    <label>E-mail</label>
                                    <input
                                        type="email"
                                        name="Contact_Email"
                                        value={formData.Contact_Email}
                                        onChange={handleChange}

                                    />
                                </div>
                            </div>

                            <div className="contect-group">
                                <label>Number</label>
                                <input
                                    type="text"
                                    name="Phone_Number"
                                    value={formData.Phone_Number}
                                    onChange={handleChange}

                                />
                            </div>

                            <div className="contect-group">
                                <label>Message</label>
                                <textarea
                                    name="Contact_Message"
                                    value={formData.Contact_Message}
                                    onChange={handleChange}

                                />
                            </div>

                            <button type="submit" className="contect-submit-btn">SEND</button>
                        </form>
                    </div>

                </div>
            </div>


            <ToastContainer />
        </>
    );
};

export default Contect;
