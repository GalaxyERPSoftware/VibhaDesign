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



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {
  const { Id } = useParams(); // Get Id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    axios.get(`http://192.168.1.9:8088/api/viewsinglepage/${Id}`)
      .then(res => {
        setProduct(res.data.SingleView);
        setLoading(false); // 🛑 Set loading false when data received
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false); // 🛑 Set loading false even on error
      });
  }, [Id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product Not Found</div>; // If no product found
  }

  return (
    <div>
      <h1>{product.Product_Name}</h1>
      <img
        src={`http://192.168.1.9:8088${product.Product_Img}`}
        alt={product.Product_Name}
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />
      <p>Price: ₹{product.Rate}</p>
      <p>Description: {product.Description}</p>
    </div>
  );
};

export default SingleProduct;
