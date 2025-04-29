// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const Addproduct = () => {
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setsubCategories] = useState([]);

//     useEffect(() => {
//         axios.get("http://192.168.1.9:8088/api/getcategory")
//             .then(res => {
//                 if (res.data && res.data.category) {
//                     setCategories(res.data.category);
//                 }
//             })
//             .catch(err => {
//                 console.error("Error fetching categories:", err);
//             });
//     }, []);
//     useEffect(() => {
//         axios.get("http://192.168.1.9:8088/api/getsubcategory")
//             .then(res => {
//                 if (res.data && res.data.subCategory) {
//                     setsubCategories(res.data.subCategory);
//                 }
//             })
//             .catch(err => {
//                 console.error("Error fetching categories:", err);
//             });
//     }, []);

//     return (
//         <div className="form">
//             <label htmlFor="productName">Product Name</label>
//             <input type="text" id="productName" />

//             <label htmlFor="category">Choose a Category:</label>
//             <select name="category" id="category">
//                 <option value="">-- Select Category --</option>
//                 {categories.map((cat) => (
//                     <option key={cat.Miscellaneous_ID} value={cat.Miscellaneous_ID}>
//                         {cat.Name}
//                     </option>
//                 ))}
//             </select>

//             <label htmlFor="subcategory">Choose a SubCategory:</label>
//             <select name="Subcategory" id="Subcategory">
//                 <option value="">-- Select Category --</option>
//                 {subcategories.map((subcat) => (
//                     <option key={subcat.Miscellaneous_ID} value={subcat.Miscellaneous_ID}>
//                         {subcat.Name}
//                     </option>
//                 ))}
//             </select>

//             <label htmlFor="price">Price</label>
//             <input type="text" id="productName" />
//             <label htmlFor="">Select image </label>
//             <input type="file" name="" id="" />
//             <label for="status">Choose a status:</label>

//             <select name="status" id="status">
//                 <option value="">-- Select Category --</option>
//                 <option value="true">true</option>
//                 <option value="false">false</option>
//             </select>
//         </div>
//     );
// };

// export default Addproduct;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import './Addproduct.css'; // CSS file to be created next

// const Addproduct = () => {
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setsubCategories] = useState([]);

//     useEffect(() => {
//         axios.get("http://192.168.1.9:8088/api/getcategory")
//             .then(res => {
//                 if (res.data && res.data.category) {
//                     setCategories(res.data.category);
//                 }
//             })
//             .catch(err => {
//                 console.error("Error fetching categories:", err);
//             });
//     }, []);

//     useEffect(() => {
//         axios.get("http://192.168.1.9:8088/api/getsubcategory")
//             .then(res => {
//                 if (res.data && res.data.subCategory) {
//                     setsubCategories(res.data.subCategory);
//                 }
//             })
//             .catch(err => {
//                 console.error("Error fetching subcategories:", err);
//             });
//     }, []);

//     return (
//         <div className="form-container">
//             <label htmlFor="productName" className="form-label">Product Name</label>
//             <input type="text" id="productName" className="form-input" />

//             <label htmlFor="category" className="form-label">Choose a Category:</label>
//             <select name="category" id="category" className="form-select">
//                 <option value="">-- Select Category --</option>
//                 {categories.map((cat) => (
//                     <option key={cat.Miscellaneous_ID} value={cat.Miscellaneous_ID}>
//                         {cat.Name}
//                     </option>
//                 ))}
//             </select>

//             <label htmlFor="Subcategory" className="form-label">Choose a SubCategory:</label>
//             <select name="Subcategory" id="Subcategory" className="form-select">
//                 <option value="">-- Select Category --</option>
//                 {subcategories.map((subcat) => (
//                     <option key={subcat.Miscellaneous_ID} value={subcat.Miscellaneous_ID}>
//                         {subcat.Name}
//                     </option>
//                 ))}
//             </select>

//             <label htmlFor="price" className="form-label">Price</label>
//             <input type="text" id="price" className="form-input" />
//             <label htmlFor="price" className="form-label">quentity</label>
//             <input type="text" id="price" className="form-input" />

//             <label htmlFor="image" className="form-label">Select image</label>
//             <input type="file" id="image" className="form-file" />

//             <label htmlFor="status" className="form-label">Choose a status:</label>
//             <select name="status" id="status" className="form-select">
//                 <option value="">-- Select Category --</option>
//                 <option value="true">true</option>
//                 <option value="false">false</option>
//             </select>

//             <input type="submit" name="" id="" />
//         </div>
//     );
// };

// export default Addproduct;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Addproduct = () => {
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setSubcategories] = useState([]);
//     const [formData, setFormData] = useState({
//         Product_Name: '',
//         Category_id: '',
//         Subcategory_id: '',
//         Quantity: '',
//         Rate: '',
//         Remark: '',
//         Status: '',
//         Product_Img: null
//     });

//     useEffect(() => {
//         axios.get("http://192.168.1.9:8088/api/getcategory")
//             .then(res => {
//                 if (res.data && res.data.category) {
//                     setCategories(res.data.category);
//                 }
//             })
//             .catch(err => console.error("Error fetching categories:", err));

//         axios.get("http://192.168.1.9:8088/api/getsubcategory")
//             .then(res => {
//                 if (res.data && res.data.subCategory) {
//                     setSubcategories(res.data.subCategory);
//                 }
//             })
//             .catch(err => console.error("Error fetching subcategories:", err));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleFileChange = (e) => {
//         setFormData(prev => ({
//             ...prev,
//             Product_Img: e.target.files[0]
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         data.append("Product_Name", formData.Product_Name);
//         data.append("Category_id", formData.Category_id);
//         data.append("Subcategory_id", formData.Subcategory_id);
//         data.append("Quantity", formData.Quantity);
//         data.append("Rate", formData.Rate);
//         data.append("Remark", formData.Remark);
//         data.append("Status", formData.Status);
//         data.append("Product_Img", formData.Product_Img);

//         try {
//             const res = await axios.post("http://192.168.1.9:8088/api/addproduct", data);
//             alert("Product added successfully!");
//             console.log(res.data);
//         } catch (error) {
//             console.error("Error adding product:", error);
//             alert("Failed to add product.");
//         }
//     };

//     return (
//         <form className="form-container" onSubmit={handleSubmit}>
//             <label className="form-label">Product Name</label>
//             <input type="text" name="Product_Name" className="form-input" onChange={handleChange} />

//             <label className="form-label">Choose a Category:</label>
//             <select name="Category_id" className="form-select" onChange={handleChange}>
//                 <option value="">-- Select Category --</option>
//                 {categories.map((cat) => (
//                     <option key={cat.Miscellaneous_ID} value={cat.Miscellaneous_ID}>
//                         {cat.Name}
//                     </option>
//                 ))}
//             </select>

//             <label className="form-label">Choose a SubCategory:</label>
//             <select name="Subcategory_id" className="form-select" onChange={handleChange}>
//                 <option value="">-- Select Category --</option>
//                 {subcategories.map((subcat) => (
//                     <option key={subcat.Miscellaneous_ID} value={subcat.Miscellaneous_ID}>
//                         {subcat.Name}
//                     </option>
//                 ))}
//             </select>

//             <label className="form-label">Quantity</label>
//             <input type="text" name="Quantity" className="form-input" onChange={handleChange} />

//             <label className="form-label">Rate</label>
//             <input type="text" name="Rate" className="form-input" onChange={handleChange} />

//             <label className="form-label">Remark</label>
//             <input type="text" name="Remark" className="form-input" onChange={handleChange} />

//             <label className="form-label">Select image</label>
//             <input type="file" name="Product_Img" className="form-file" onChange={handleFileChange} />

//             <label className="form-label">Choose a status:</label>
//             <select name="Status" className="form-select" onChange={handleChange}>
//                 <option value="">-- Select Status --</option>
//                 <option value="true">true</option>
//                 <option value="false">false</option>
//             </select>

//             <input type="submit" value="Add Product" className="form-submit" />
//         </form>
//     );
// };

// export default Addproduct;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        axios.get("http://192.168.1.9:8088/api/getcategory")
            .then(res => {
                if (res.data && res.data.category) {
                    setCategories(res.data.category);
                }
            })
            .catch(err => console.error("Error fetching categories:", err));

        axios.get("http://192.168.1.9:8088/api/getsubcategory")
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
            const res = await axios.post("http://192.168.1.9:8088/api/addproduct", data);
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
