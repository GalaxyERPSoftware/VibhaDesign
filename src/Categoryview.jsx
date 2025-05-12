import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';

const Categoryview = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setsubCategories] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/getcategory`)
            .then(res => {
                if (res.data && res.data.Category) {
                    setCategories(res.data.Category);
                }
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
            });

        axios.get(`${API_BASE_URL}/api/getsubcategory`)
            .then(res => {
                if (res.data && res.data.SubCategory) {
                    setsubCategories(res.data.SubCategory);
                }
            })
            .catch(err => {
                console.error('Error fetching subcategories:', err);
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

