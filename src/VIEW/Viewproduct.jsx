import React from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Viewproduct = ({ products = [] }) => {
    if (!products.length) {
        return <div className="no-products">No products found</div>;
    }

    return (
        <div className="products-grid">
            {products.map(product => (
                <div key={product.Product_Id} className="item">
                    <img
                        src={`${API_BASE_URL}${product.Product_Img}`}
                        alt={product.Product_Name}
                        className="product-image"
                        onError={(e) => {
                            e.target.src = '/assets/img/placeholder.jpg'; // Fallback image
                            e.target.onerror = null; // Prevent infinite loop
                        }}
                    />
                    <div className="Quiek-view">
                        <Link to={`/product/${product.Product_Id}`}>Quick view</Link>
                    </div>
                    <div className="shop-box">
                        <span className="s1">{product.Product_Name}</span>
                        <span className="s2">₹{product.Rate}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Viewproduct;
