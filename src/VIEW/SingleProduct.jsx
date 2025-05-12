// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const SingleProduct = () => {
//   const { Id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios.get('http://192.168.1.9:8088/api/viewsinglepage', {
//       params: { Product_Id: Id }
//     })
//     .then(res => {
//       setProduct(res.data.SingleView);
//     })
//     .catch(err => {
//       console.error(err);
//     });
//   }, [Id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{product.Product_Name}</h1>
//       <img src={`http://192.168.1.9:8088${product.Product_Img}`} alt={product.Product_Name} width="200" />
//       <p>Price: ₹{product.Rate}</p>
//       <p>{product.Description}</p>
//     </div>
//   );
// };

// export default SingleProduct;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const SingleProduct = () => {
//   const { Id } = useParams(); // Get Id from URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true); // New loading state

//   useEffect(() => {
//     axios.get(`http://192.168.1.9:8088/api/viewsinglepage/${Id}`)
//       .then(res => {
//         setProduct(res.data.SingleView);
//         setLoading(false); // 🛑 Set loading false when data received
//       })
//       .catch(err => {
//         console.error('Error fetching product:', err);
//         setLoading(false); // 🛑 Set loading false even on error
//       });
//   }, [Id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!product) {
//     return <div>Product Not Found</div>; // If no product found
//   }

//   return (
//     <div>
//       <h1>{product.Product_Name}</h1>
//       <img
//         src={`http://192.168.1.9:8088${product.Product_Img}`}
//         alt={product.Product_Name}
//         style={{ width: '300px', height: '300px', objectFit: 'cover' }}
//       />
//       <p>Price: ₹{product.Rate}</p>
//       <p>Description: {product.Description}</p>
//     </div>
//   );
// };

// export default SingleProduct;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const SingleProduct = () => {
//   const { id } = useParams(); // Get Product_Id from URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://192.168.1.9:8088/api/viewsinglepage', {
//       Product_Id: parseInt(id)
//     })
//       .then(res => {
//         console.log('Single product response:', res.data); // 👈 Console log here
//         setProduct(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching product:', err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading product details...</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="single-product">
//       <img
//         src={`http://192.168.1.9:8088${product.Product_Img}`}
//         alt={product.Product_Name}
//       />
//       <h2>{product.Product_Name}</h2>
//       <p>Price: ₹{product.Rate}</p>
//     </div>
//   );
// };

// export default SingleProduct;













// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const SingleProduct = () => {
//     const { id } = useParams(); // get Product_Id from URL
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get(`http://192.168.1.9:8088/api/viewsinglepage?Product_Id=${id}`)
//             .then(res => {
//                 console.log('Single product data:', res.data); // 👈 Console log
//                 setProduct(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error('Error fetching single product:', err); // 👈 Error log
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!product) {
//         return <div>No product found</div>;
//     }

//     return (
//         <div className="single-product">
//             <img src={`http://192.168.1.9:8088${product.Product_Img}`} alt={product.Product_Name} />
//             <h2>{product.Product_Name}</h2>
//             <p>Price: ₹{product.Rate}</p>
//         </div>
//     );
// };

// export default SingleProduct;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const SingleProduct = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get(`http://192.168.1.9:8088/api/viewsinglepage?Product_Id=${id}`)
//             .then(res => {
//                 console.log('Single product data:', res.data);
//                 setProduct(res.data.ProductView); // 👈 Here change if needed
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error('Error fetching single product:', err);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!product) {
//         return <div>No product found</div>;
//     }

//     return (
//         <div className="single-product">
//             <img src={`http://192.168.1.9:8088${product.Product_Img}`} alt={product.Product_Name} />
//             <h2>{product.Product_Name}</h2>
//             <p>Price: ₹{product.Rate}</p>
//         </div>
//     );
// };

// export default SingleProduct;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoInstagram, IoBagSharp } from "react-icons/io5";
import { TiSocialFacebook } from "react-icons/ti";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { PiBagLight } from "react-icons/pi";
import { Button, Drawer } from 'antd';
import { API_BASE_URL } from '../config';

const SingleProduct = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [showSearch, setShowSearch] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
  const fullName = user ? `${user.first_name} ${user.last_name}` : "Login"; // Set fallback text


  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/viewsinglepage`, {
          params: { Product_Id: id }
        });
        if (response.data && response.data.ProductDetails) {
          setProduct(response.data.ProductDetails[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

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
                <img src="/assets/img/whatsapp.png" alt="" />
                <ul className="middle-menu">
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/workshop'>Workshop</Link></li>
                </ul>
              </div>
            </div>
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
      <div className="product-main">
        <div className="container">
          <div className="product-inner-main">
            <div className="product-child">
              <div className="product-inner-child">
                <img src={`${API_BASE_URL}${product.Product_Img}`} alt={product.Product_Name} />
              </div>
            </div>
            <div className="product-child">
              <div className="product-inner-child">
                <div className="single-product">
                  <p>{product.Product_Name}</p>
                  <p> ₹{product.Rate}</p>
                  <label htmlFor="quantity">Quantity</label>
                  <input type="number" id="quantity" defaultValue={1} min="1" />
                  <button className="add-to-cart">Add to Cart</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;



























// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Link } from 'react-router-dom'
// import { FaWhatsapp } from "react-icons/fa6";
// import { IoLogoInstagram, IoBagSharp } from "react-icons/io5";
// import { TiSocialFacebook } from "react-icons/ti";
// import { CiUser } from "react-icons/ci";
// import { IoIosSearch } from "react-icons/io";
// import { PiBagLight } from "react-icons/pi";
// import { Button, Drawer } from 'antd';


// const SingleProduct = () => {
//   const [open, setOpen] = useState(false);
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };
//   const [showSearch, setShowSearch] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
//   const fullName = user ? `${user.first_name} ${user.last_name}` : "Login"; // Set fallback text


//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`http://192.168.1.9:8088/api/viewsinglepage?Product_Id=${id}`)
//       .then(res => {
//         console.log('Single product data:', res.data);
//         if (res.data && res.data.ProductDetails && res.data.ProductDetails.length > 0) {
//           setProduct(res.data.ProductDetails[0]); // ✅ Correct
//         } else {
//           setProduct(null);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching single product:', err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!product) {
//     return <div>No product found</div>;
//   }


//   return (
//     <>

//       <div className="product-main">
//         <div className="container">
//           <div className="product-inner-main">
//             <div className="product-child">
//               <div className="product-inner-child">
//                 <img src={`http://192.168.1.9:8088${product.Product_Img}`} alt={product.Product_Name} />

//               </div>
//             </div>
//             <div className="product-child">
//               <div className="product-inner-child">
//                 <div className="single-product">
//                   <p>{product.Product_Name}</p>
//                   <p> ₹{product.Rate}</p>
//                   <label htmlFor="quantity">Quantity</label>
//                   <input type="number" id="quantity" defaultValue={1} min="1" />
//                   <button className="add-to-cart">Add to Cart</button>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleProduct;

