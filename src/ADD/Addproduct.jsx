import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Addproduct = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [formData, setFormData] = useState({
        Product_Name: '',
        Category_Id: '',
        SubCategory_Id: '',
        Quantity: '',
        Rate: '',
        Remark: '',
        Status: '',
        Product_Img: null
    });

    // Fetch categories and subcategories on component load
    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/getcategory`)
            .then(res => {
                if (res.data && res.data.category) {
                    setCategories(res.data.category);
                }
            })
            .catch(err => console.error("Error fetching categories:", err));

        axios.get(`${API_BASE_URL}/api/getsubcategory`)
            .then(res => {
                if (res.data && res.data.subCategory) {
                    setSubcategories(res.data.subCategory);
                }
            })
            .catch(err => console.error("Error fetching subcategories:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            Product_Img: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("Product_Name", formData.Product_Name);
        data.append("Category_Id", formData.Category_Id);
        data.append("SubCategory_Id", formData.SubCategory_Id);
        data.append("Quantity", formData.Quantity);
        data.append("Rate", formData.Rate);
        data.append("Remark", formData.Remark);
        data.append("Status", formData.Status);
        data.append("Product_Img", formData.Product_Img);

        console.log("Submitting form data:", Object.fromEntries(data.entries())); // Debugging log

        try {
            const res = await axios.post(`${API_BASE_URL}/api/addproduct`, data);
            alert("Product added successfully!");
            console.log(res.data);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <label className="form-label">Product Name</label>
            <input
                type="text"
                name="Product_Name"
                className="form-input"
                value={formData.Product_Name}
                onChange={handleChange}
            />

            <label className="form-label">Choose a Category:</label>
            <select
                name="Category_Id"
                className="form-select"
                value={formData.Category_Id}
                onChange={handleChange}
            >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                    <option key={cat.Miscellaneous_ID} value={cat.Miscellaneous_ID}>
                        {cat.Name}
                    </option>
                ))}
            </select>

            <label className="form-label">Choose a SubCategory:</label>
            <select
                name="SubCategory_Id"
                className="form-select"
                value={formData.SubCategory_Id}
                onChange={handleChange}
            >
                <option value="">-- Select Subcategory --</option>
                {subcategories.map((subcat) => (
                    <option key={subcat.Miscellaneous_ID} value={subcat.Miscellaneous_ID}>
                        {subcat.Name}
                    </option>
                ))}
            </select>

            <label className="form-label">Quantity</label>
            <input
                type="text"
                name="Quantity"
                className="form-input"
                value={formData.Quantity}
                onChange={handleChange}
            />

            <label className="form-label">Rate</label>
            <input
                type="text"
                name="Rate"
                className="form-input"
                value={formData.Rate}
                onChange={handleChange}
            />

            <label className="form-label">Remark</label>
            <input
                type="text"
                name="Remark"
                className="form-input"
                value={formData.Remark}
                onChange={handleChange}
            />

            <label className="form-label">Select image</label>
            <input
                type="file"
                name="Product_Img"
                className="form-file"
                onChange={handleFileChange}
            />

            <label className="form-label">Choose a status:</label>
            <select
                name="Status"
                className="form-select"
                value={formData.Status}
                onChange={handleChange}
            >
                <option value="">-- Select Status --</option>
                <option value="true">true</option>
                <option value="false">false</option>
            </select>

            <button type="submit" className="form-submit">Add Product</button>
        </form>
    );
};

export default Addproduct;
