import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';

const Categoryview = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setsubCategories] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/getcategory`)
            .then(response => {
                if (response.data && response.data.category) {
                    setCategories(response.data.category);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/getsubcategory`)
            .then(response => {
                if (response.data && response.data.subCategory) {
                    setsubCategories(response.data.subCategory);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <>
            <label htmlFor="categorySelect">Select Category:</label>
            <select id="categorySelect" className="border px-3 py-2 rounded">
                <option value="">-- Select --</option>
                {categories.map(cat => (
                    <option key={cat.Miscellaneous_ID} value={cat.Miscellaneous_ID}>
                        {cat.Name}
                    </option>
                ))}
            </select>
            <label htmlFor="categorySelect">Select Sub Category:</label>
            <select id="categorySelect" className="border px-3 py-2 rounded">
                <option value="">-- Select --</option>
                {subcategories.map(subcat => (
                    <option key={subcat.Miscellaneous_ID} value={subcat.Miscellaneous_ID}>
                        {subcat.Name}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Categoryview;

