import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Header from '../Header';

const Addcategory = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Category');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            alert('Please enter a valid category name.');
            return;
        }

        const payload = {
            Name: name,
            TranType: type,
        };

        try {
            await axios.post(`${API_BASE_URL}/api/addcategory`, payload);
            setMessage('Category added successfully!');
            setName('');
            setType('Category');
        } catch (error) {
            console.error('Error adding:', error);
            setMessage('Failed to add category. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="main-category">
                <div className="category-wrapper">
                    <div className="category-form-box">
                        <h2>CATEGORY SELECTION</h2>
                        <hr />
                        <form onSubmit={handleSubmit} className="category-form">
                            <div className="category-radio-options">
                                <label>
                                    <input
                                        type="radio"
                                        value="Category"
                                        checked={type === 'Category'}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                    Category
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="Sub Category"
                                        checked={type === 'Sub Category'}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                    Sub-Category
                                </label>
                            </div>
                            <div className="category-input-box">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter category name"
                                />
                            </div>
                            <button type="submit" className="category-submit-btn">ADD CATEGORY</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Addcategory;
