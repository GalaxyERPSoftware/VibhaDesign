// import React from 'react';
// import Header from './Header';
// import { useNavigate } from 'react-router-dom';

// const Myaccount = () => {
//     const navigate = useNavigate();
//     const user = JSON.parse(localStorage.getItem('user'));
//     const handleLogout = () => {
//         localStorage.removeItem('user'); // ❌ Remove user from localStorage
//         // localStorage.removeItem('token'); // (optional) if you stored a token
//         navigate('/login'); // 🔁 Redirect to login page
//     };
//     if (!user) {
//         return <div>Please log in to view your account.</div>;
//     }

//     return (
//         <>
//             <Header />
//             <div className="account-main">
//                 <div className="container">
//                     <p>MY Account</p>
//                     <button className="logout-btn" onClick={handleLogout}>Logout</button>
//                 </div>
//             </div>
//             {user ? (
//                 <div className="user-name">
//                     Welcome, {user.First_Name} {user.Last_Name}
//                 </div>
//             ) : (
//                 <div className="user-name">Welcome, Guest</div>
//             )}
//         </>
//     );
// };

// export default Myaccount;

// import React from 'react';
// import Header from './Header';
// import { useNavigate } from 'react-router-dom';
// // import './Myaccount.css';

// const Myaccount = () => {
//     const navigate = useNavigate();
//     const user = JSON.parse(localStorage.getItem('user'));

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     if (!user) {
//         return <div className="account-wrapper">Please log in to view your account.</div>;
//     }

//     return (
//         <>
//             <Header />
//             <div className="account-wrapper">
//                 <div className="account-title">
//                     <h1>MY ACCOUNT</h1>
//                     <button onClick={handleLogout}>LOG OUT</button>
//                 </div>
//                 <div className="account-columns">
//                     <div className="account-left">
//                         <h2>ORDER HISTORY</h2>
//                         <p>You haven't placed any orders yet.</p>
//                     </div>
//                     <div className="account-right">
//                         <h2>ACCOUNT DETAILS</h2>
//                         <p className="uppercase">{user.First_Name} {user.Last_Name}</p>
//                         <p>{user.First_Name.toLowerCase()} {user.Last_Name.toLowerCase()}</p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Myaccount;


import React from 'react';
import Header from './Header';
// import './Myaccount.css';
import { useNavigate } from 'react-router-dom';

const Myaccount = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return <div className="account-page">Please log in to view this page.</div>;
    }

    return (
        <>
            <Header />
            <div className="account-page">
                <div className="account-title">
                    <h1>MY ACCOUNT</h1>
                    <button onClick={handleLogout}>LOG OUT</button>
                </div>

                <div className="account-content">
                    
                    <div className="account-details">
                        {/* <h2>ACCOUNT DETAILS</h2> */}
                        <p className="caps-name">{user.First_Name} {user.Last_Name}</p>
                        <p>{user.First_Name.toLowerCase()} {user.Last_Name.toLowerCase()}</p>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default Myaccount;
