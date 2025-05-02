import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import Viewproduct from './VIEW/Viewproduct';
import { API_BASE_URL } from './config';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [openSection, setOpenSection] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch categories
        axios.get(`${API_BASE_URL}/api/getcategory`)
            .then(response => {
                if (response.data && response.data.category) {
                    setCategories(response.data.category);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));

        // Fetch subcategories
        axios.get(`${API_BASE_URL}/api/getsubcategory`)
            .then(response => {
                if (response.data && response.data.subCategory) {
                    setSubCategories(response.data.subCategory);
                }
            })
            .catch(error => console.error('Error fetching subcategories:', error));
    }, []);

    useEffect(() => {
        // Fetch products based on selected category and subcategory
        const catId = selectedCategory || 0;
        const subCatId = selectedSubCategory || 0;
        
        axios.get(`${API_BASE_URL}/api/getproducts/${catId}/${subCatId}`)
            .then(response => {
                if (response.data && response.data.products) {
                    setProducts(response.data.products);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [selectedCategory, selectedSubCategory]);

    const toggleSection = (section) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedSubCategory(null); // Reset subcategory when category changes
    };

    const handleSubCategoryClick = (subCategoryId) => {
        setSelectedSubCategory(subCategoryId);
    };

    const renderDropdown = (type) => {
        if (type === 'category') {
            return (
                <div className="dropdown-content">
                    <div 
                        key="all" 
                        onClick={() => handleCategoryClick(null)}
                        className={selectedCategory === null ? 'active' : ''}
                    >
                        All Categories
                    </div>
                    {categories.map(cat => (
                        <div 
                            key={cat.Category_Id} 
                            onClick={() => handleCategoryClick(cat.Category_Id)}
                            className={selectedCategory === cat.Category_Id ? 'active' : ''}
                        >
                            {cat.Name}
                        </div>
                    ))}
                </div>
            );
        } else if (type === 'subcategory') {
            const filteredSubcategories = selectedCategory 
                ? subcategories.filter(sub => sub.Category_Id === selectedCategory)
                : subcategories;

            return (
                <div className="dropdown-content">
                    <div 
                        key="all" 
                        onClick={() => handleSubCategoryClick(null)}
                        className={selectedSubCategory === null ? 'active' : ''}
                    >
                        All Subcategories
                    </div>
                    {filteredSubcategories.map(subcat => (
                        <div 
                            key={subcat.SubCategory_Id} 
                            onClick={() => handleSubCategoryClick(subcat.SubCategory_Id)}
                            className={selectedSubCategory === subcat.SubCategory_Id ? 'active' : ''}
                        >
                            {subcat.Name}
                        </div>
                    ))}
                </div>
            );
        } else if (type === 'price') {
            return (
                <div className="dropdown-content">
                    <div>0 - 500</div>
                    <div>500 - 1000</div>
                    <div>1000 - 2000</div>
                </div>
            );
        }
    };

    return (
        <>
            {/* header part start  */}
            <Header />
            {/* header part end  */}

            <div className="shop-main">
                <div className="container">
                    <div className="shop-inner-main">
                        <div className="shop-child">
                            <div className="shop-inner-child">
                                <div className="filter-box">
                                    {['category', 'subcategory', 'price'].map(type => (
                                        <div key={type} className="filter-item">
                                            <div className="filter-header" onClick={() => toggleSection(type)}>
                                                <span className="filter-label">
                                                    {type === 'category' ? 'Category' :
                                                        type === 'subcategory' ? 'Sub-Category' : 'Price'}
                                                </span>
                                                <span className="filter-icon">
                                                    {openSection === type ? <FaMinus /> : <FaPlus />}
                                                </span>
                                            </div>
                                            {openSection === type && (
                                                <div className="dropdown-box">
                                                    {renderDropdown(type)}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="shop-child">
                            <div className="shop-inner-child">
                                <Viewproduct products={products} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop;


// import React, { useEffect, useState } from 'react';
// import Header from './Header';
// import axios from 'axios';
// import { FaPlus, FaMinus } from 'react-icons/fa';

// const Shop = () => {
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setSubCategories] = useState([]);
//     const [openSection, setOpenSection] = useState(null);

//     useEffect(() => {
//         axios.get('http://192.168.1.9:8088/api/getcategory')
//             .then(response => {
//                 if (response.data && response.data.category) {
//                     setCategories(response.data.category);
//                 }
//             })
//             .catch(error => console.error('Error fetching categories:', error));
//     }, []);

//     useEffect(() => {
//         axios.get('http://192.168.1.9:8088/api/getsubcategory')
//             .then(response => {
//                 if (response.data && response.data.subCategory) {
//                     setSubCategories(response.data.subCategory);
//                 }
//             })
//             .catch(error => console.error('Error fetching subcategories:', error));
//     }, []);

//     const toggleSection = (section) => {
//         setOpenSection(prev => (prev === section ? null : section));
//     };

//     const renderDropdown = (type) => {
//         if (type === 'category') {
//             return (
//                 <div className="dropdown-content">
//                     {categories.map(cat => (
//                         <div key={cat.Miscellaneous_ID}>{cat.Name}</div>
//                     ))}
//                 </div>
//             );
//         } else if (type === 'subcategory') {
//             return (
//                 <div className="dropdown-content">
//                     {subcategories.map(subcat => (
//                         <div key={subcat.Miscellaneous_ID}>{subcat.Name}</div>
//                     ))}
//                 </div>
//             );
//         } else if (type === 'price') {
//             return (
//                 <div className="dropdown-content">
//                     <div>0 - 500</div>
//                     <div>500 - 1000</div>
//                     <div>1000 - 2000</div>
//                 </div>
//             );
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="shop-main">
//                 <div className="container">
//                     <div className="filter-box">
//                         {['category', 'subcategory', 'price'].map(type => (
//                             <div key={type} className="filter-item">
//                                 <div className="filter-header" onClick={() => toggleSection(type)}>
//                                     <span className="filter-label">
//                                         {type === 'category' ? 'Category' :
//                                             type === 'subcategory' ? 'Sub-Category' : 'Price'}
//                                     </span>
//                                     <span className="filter-icon">
//                                         {openSection === type ? <FaMinus /> : <FaPlus />}
//                                     </span>
//                                 </div>
//                                 {openSection === type && (
//                                     <div className="dropdown-box">
//                                         {renderDropdown(type)}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Shop;
