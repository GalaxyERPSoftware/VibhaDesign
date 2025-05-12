import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../config';

const Viewproduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    // Load all products on mount
    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/productview`)
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

    // Open modal with product details
    const handleQuickView = (id) => {
        axios.post(`${API_BASE_URL}/api/viewsinglepage`, { Product_Id: id })
            .then(res => {
                if (res.data && res.data.ProductDetails && res.data.ProductDetails.length > 0) {
                    setSelectedProduct(res.data.ProductDetails[0]);
                    setQuantity(1);
                    setIsModalOpen(true);
                }
            })
            .catch(err => {
                console.error('Error fetching single product:', err);
            });
    };

    // Close modal
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Add product to cart
    const handleAddToCart = () => {
        if (!selectedProduct) return;

        const user = JSON.parse(localStorage.getItem('user'));
        const customerId = user?.UserID;

        if (!customerId) {
            toast.error('Please log in first');
            setTimeout(() => {
                navigate('/login'); // ⬅️ Redirect to login page
            }, 1500); // wait 1.5 seconds before redirect
            return;
        }

        const data = {
            Product_ID: selectedProduct.Product_Id,
            Category_ID: selectedProduct.Category_Id,
            SubCategory_ID: selectedProduct.SubCategory_Id,
            Quantity: quantity,
            Customer_ID: customerId
        };

        axios.post(`${API_BASE_URL}/api/addtocart`, data)
            .then(res => {
                toast.success('Product added to cart!');
                setIsModalOpen(false);
            })
            .catch(err => {
                console.error('Error adding to cart:', err);
                toast.error('Failed to add product to cart');
            });
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} />
            {products.map(product => (
                <div key={product.Product_Id} className="item">
                    <img
                        src={`${API_BASE_URL}${product.Product_Img}`}
                        alt={product.Product_Name}
                        className="imgimgimg"
                    />
                    <div className="Quiek-view">
                        <span onClick={() => window.open('', '_blank')}>Quick view</span>
                    </div>
                    <div className="shop-box">
                        <span className="s1">{product.Product_Name}</span>
                        <span className="s2">₹{product.Rate}</span>
                    </div>
                </div>
            ))}

            <Modal
                title={null}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                centered
                width={800}
            >
                {selectedProduct ? (
                    <div className="modal-layout">
                        <div className="modal-left">
                            <div className="modal-image-box">
                                <img
                                    src={`${API_BASE_URL}${selectedProduct.Product_Img}`}
                                    alt={selectedProduct.Product_Name}
                                />
                            </div>
                        </div>
                        <div className="modal-right">
                            <h2 className="product-name">{selectedProduct.Product_Name}</h2>

                            <div className="product-details">
                                <p className="product-category">
                                    Category: {selectedProduct.category}
                                </p>
                                <p className="product-subcategory">
                                    Subcategory: {selectedProduct.SubCategory}
                                </p>
                            </div>

                            <p className="product-price">₹ {selectedProduct.Rate}</p>

                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                min={1}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />

                            <button className="add-to-cart" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal>
        </>
    );
};

export default Viewproduct;
