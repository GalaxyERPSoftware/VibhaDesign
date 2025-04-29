// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Viewproduct = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get('http://192.168.1.9:8088/api/productview')
//             .then((res) => {
//                 console.log("Full API response:", res.data); // ✅ Full response print
//                 if (res.data && res.data.ProductView) {
//                     console.log("ProductView array:", res.data.ProductView); // ✅ Product list print
//                     setProducts(res.data.ProductView);
//                 } else {
//                     console.error("No ProductView data found");
//                 }
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error('Error fetching product data:', err);
//                 setLoading(false);
//             });
//     }, []);


//     if (loading) {
//         return <div className="text-center mt-10 text-lg font-semibold">Loading products...</div>;
//     }
//     return (
//         <>
//             {products.length > 0 ? (
//                 products.map(product => (
//                     <div className="item">
//                         {/* <img src="assets/img/cate1.jpg" alt="" className='imgimgimg' /> */}
//                         {/* <img src={`http://192.168.1.9:8088/api/productimage${product.Product_Img}`} alt={product.Product_Name} /> */}
//                         <img src={`http://192.168.1.9:8088/api/productimage/${product.Product_Img}`} alt={product.Product_Name} />
//                         <div className="Quiek-view">
//                             <span className="q1"><a href="#">Quick view</a></span>
//                         </div>
//                         <div className="shop-box">
//                             <span className="s1">{product.Product_Name}</span>
//                             <span className="s2">₹{product.Rate}</span>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="col-span-full text-center text-gray-500">No products found.</div>
//             )}


//         </>
//     )
// }

// export default Viewproduct





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Viewproduct = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get('http://192.168.1.9:8088/api/productview');
//                 if (res.data && res.data.ProductView) {
//                     const productsWithImages = await Promise.all(
//                         res.data.ProductView.map(async (product) => {
//                             try {
//                                 const imgRes = await axios.post('http://192.168.1.9:8088/api/productimage', {
//                                     Product_Id: product.Product_Id,
//                                 });
//                                 if (imgRes.data && imgRes.data.length > 0) {
//                                     const base64Image = imgRes.data[0].Product_Img;
//                                     return { ...product, image: base64Image };
//                                 }
//                                 return { ...product, image: null };
//                             } catch (imgErr) {
//                                 console.error('Error fetching image:', imgErr);
//                                 return { ...product, image: null };
//                             }
//                         })
//                     );
//                     setProducts(productsWithImages);
//                 } else {
//                     console.error("No ProductView data found");
//                 }
//             } catch (err) {
//                 console.error('Error fetching product data:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) {
//         return <div className="text-center mt-10 text-lg font-semibold">Loading products...</div>;
//     }

//     return (
//         <>
//             {products.length > 0 ? (
//                 products.map((product, index) => (
//                     <div key={index} className="item">
//                         {product.image ? (
//                             <img
//                                 src={`data:image/jpeg;base64,${product.image}`}
//                                 alt="Product"
//                                 className='imgimgimg'
//                             />
//                         ) : (
//                             <div>No Image</div>
//                         )}
//                         <div className="Quiek-view">
//                             <span className="q1"><a href="#">Quick view</a></span>
//                         </div>
//                         <div className="shop-box">
//                             <span className="s1">{product.Product_Name}</span>
//                             <span className="s2">₹{product.Rate}</span>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="col-span-full text-center text-gray-500">No products found.</div>
//             )}
//         </>
//     );
// }

// export default Viewproduct;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Viewproduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://192.168.1.9:8088/api/productview')
            .then(res => {
                if (res.data && res.data.ProductView) {
                    setProducts(res.data.ProductView);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <>
            {products.map(product => (
                <div key={product.Product_Id} className="item">
                    <img
                        src={`http://192.168.1.9:8088${product.Product_Img}`}
                        alt={product.Product_Name}
                        className="imgimgimg"
                    />
                    <div className="Quiek-view">
                        {/* <span className="q1"><Link>Quick view</Link></span> */}
                        <Link to={`/product/${product.Product_Id}`}>Quick view</Link>

                    </div>
                    <div className="shop-box">
                        <span className="s1">{product.Product_Name}</span>
                        <span className="s2">₹{product.Rate}</span>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Viewproduct;
