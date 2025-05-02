import React, { useState } from 'react';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';

const Ragister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        First_Name: '',
        Last_Name: '',
        Email: '',
        Password: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.First_Name.trim()) {
            toast.error("Please enter First Name");
            return;
        }
        if (!formData.Last_Name.trim()) {
            toast.error("Please enter Last Name");
            return;
        }
        if (!formData.Email.trim()) {
            toast.error("Please enter Email");
            return;
        }
        if (!formData.Password.trim()) {
            toast.error("Please enter Password");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/userregister`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                toast.success("Registration successful!");
                console.log(result);

                // ✅ Save user data to localStorage
                localStorage.setItem("user", JSON.stringify({
                    first_name: formData.First_Name,
                    last_name: formData.Last_Name,
                    email: formData.Email,
                    password: formData.Password
                }));

                setFormData({
                    First_Name: '',
                    Last_Name: '',
                    Email: '',
                    Password: ''
                });

                setTimeout(() => {
                    navigate('/login');
                }, 1500);

            } else {
                toast.error("Registration failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="login-main">
                <div className="container">
                    <div className="login-inner-main">
                        <div className="login-child">
                            <div className="login-inner-child">
                                <h2 className="login-title">CREATE ACCOUNT</h2>
                                <label htmlFor="First_Name">FIRST NAME</label>

                                <input
                                    type="text"
                                    id="First_Name"
                                    className="login-input"
                                    value={formData.First_Name}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Last_Name">LAST NAME</label>
                                <input
                                    type="text"
                                    id="Last_Name"
                                    className="login-input"
                                    value={formData.Last_Name}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Email">E-MAIL</label>
                                <input
                                    type="email"
                                    id="Email"
                                    className="login-input"
                                    value={formData.Email}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Password">PASSWORD</label>
                                <input
                                    type="password"
                                    id="Password"
                                    className="login-input"
                                    value={formData.Password}
                                    onChange={handleChange}
                                />
                                <button className="login-button" onClick={handleSubmit}>CREATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ragister;



