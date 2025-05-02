import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const SingleProduct = () => {
  const { Id } = useParams(); // Get Id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/viewsinglepage/${Id}`)
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
        src={`${API_BASE_URL}${product.Product_Img}`}
        alt={product.Product_Name}
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />
      <p>Price: ₹{product.Rate}</p>
      <p>Description: {product.Description}</p>
    </div>
  );
};

export default SingleProduct;
