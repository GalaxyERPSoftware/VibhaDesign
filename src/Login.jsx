// import React from 'react';
// import Header from './Header';

// const Login = () => {
//     return (
//         <>
//             {/* header part start  */}
//             <Header />
//             {/* header part end  */}
//             <div className="login-main">
//                 <div className="container">
//                     <div className="login-inner-main">
//                         <div className="login-child">
//                             <div className="login-inner-child">
//                                 <h2 className="login-title">LOGIN</h2>
//                                 <label htmlFor="email">E-MAIL</label>
//                                 <input type="email" id="email" className="login-input" />

//                                 <div className="password-section">
//                                     <label htmlFor="password">PASSWORD</label>
//                                     <span className="forgot-password">forgot password?</span>
//                                 </div>
//                                 <input type="password" id="password" className="login-input" />

//                                 <button className="login-button">SIGN IN</button>
//                                 <p className="create-account">Create account</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post("http://192.168.1.54:8088/api/userlogin", {
//                 Email: email,
//                 Password: password
//             });

//             console.log("Login Success:", response.data);
//             // Token save kari sako cho localStorage ma
//             // localStorage.setItem("token", response.data.token);
//             alert("Login successful!");
//             navigate('/')

//         } catch (error) {
//             console.error("Login Failed:", error);
//             alert("Login failed. Check your credentials.");
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="login-main">
//                 <div className="container">
//                     <div className="login-inner-main">
//                         <div className="login-child">
//                             <div className="login-inner-child">
//                                 <h2 className="login-title">LOGIN</h2>
//                                 <label htmlFor="email">E-MAIL</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     className="login-input"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />

//                                 <div className="password-section">
//                                     <label htmlFor="password">PASSWORD</label>
//                                     <span className="forgot-password">forgot password?</span>
//                                 </div>
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     className="login-input"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />

//                                 <button className="login-button" onClick={handleLogin}>SIGN IN</button>
//                                 <p className="create-account"><Link to='/Creteaccount'> Create account </Link></p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from './config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        // 👇 Validation for empty fields
        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }
        if (!password.trim()) {
            toast.error("Please enter your password");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/userlogin`, {
                Email: email,
                Password: password
            });

            const data = response.data;

            if (data.message === "Invalid User") {
                toast.error("Invalid user");
            } else if (data.message === "Wrong Password") {
                toast.error("Wrong password");
            } else if (data.message === "Login Successful") {

                console.log("Login Success:", data); // ✅ Properly print data here

                // localStorage.setItem("token", data.token); // optional

            } else {
                toast.success("Successfully logged in!");
                console.log("Unexpected response:", data); // optional
                setTimeout(() => {
                    navigate('/');
                }, 1500); // Delay for showing toast
            }


        } catch (error) {
            console.error("Login Failed:", error);
            toast.error("Login failed. Try again.");
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
                                <h2 className="login-title">LOGIN</h2>
                                <label htmlFor="email">E-MAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="login-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <div className="password-section">
                                    <label htmlFor="password">PASSWORD</label>
                                    <span className="forgot-password">forgot password?</span>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="login-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button className="login-button" onClick={handleLogin}>SIGN IN</button>
                                <p className="create-account"><Link to='/Creteaccount' className="create-account"> Create account </Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
