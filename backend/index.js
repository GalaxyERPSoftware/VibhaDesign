const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { executeStoredProcedure } = require('./db.js');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const privatekey = process.env.JWT_SECRET || 'jn2005l';

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://vvdesign.in', 'https://vvdesign.in', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/img', express.static(path.join(__dirname, 'img')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'img'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// API Routes
app.get('/api/getcategory', async (req, res) => {
    try {
        const results = await executeStoredProcedure('SP_Category', [0]);
        res.json({ category: results });
    } catch (err) {
        console.error('Error in getcategory:', err);
        res.status(500).send(err.message);
    }
});

app.get('/api/getsubcategory', async (req, res) => {
    try {
        const results = await executeStoredProcedure('SP_SubCategory', [0]);
        res.json({ subCategory: results });
    } catch (err) {
        console.error('Error in getsubcategory:', err);
        res.status(500).send(err.message);
    }
});

// Add product
app.post('/api/addproduct', upload.single('Product_Img'), async (req, res) => {
    const { Product_Name, Category_Id, SubCategory_Id, Quantity, Rate, Remark, Status } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Product image is required.' });
    }

    const imagePath = `/img/${req.file.filename}`;

    try {
        await executeStoredProcedure('GenerateProductMST', [
            Product_Name, Category_Id, SubCategory_Id, Quantity, 
            Rate, Remark, Status, imagePath
        ]);
        res.json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding product', error: err.message });
    }
});

// Add category
app.post('/api/addcategory', async (req, res) => {
    const { Name, TranType } = req.body;

    try {
        if (!['Category', 'Sub Category'].includes(TranType)) {
            return res.status(400).json({ message: 'TranType must be "Category" or "Sub Category"' });
        }
        await executeStoredProcedure('AddCategory', [Name, TranType]);
        res.json({ message: 'Added successfully' });
    } catch (err) {
        console.error('Full error:', err);
        res.status(500).json({
            message: 'Error adding category',
            error: err.message || 'Unknown error'
        });
    }
});

// Product view
app.get('/api/productview', async (req, res) => {
    try {
        const results = await executeStoredProcedure('GetProductByCatAndSubCat', [0, 0]);
        const products = results.map(product => ({
            ...product,
            Product_Img: product.Product_Img || ''
        }));
        res.json({ ProductView: products });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

// User Register
app.post('/api/userregister', async (req, res) => {
    const { First_Name, Last_Name, Email, Password } = req.body;
    try {
        // Check if email exists
        const checkResults = await executeStoredProcedure('SP_GetByEmailId', [Email]);
        if (checkResults.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        await executeStoredProcedure('GenerateUserLogin', [
            First_Name, Last_Name, Email, Password
        ]);
        res.json({ message: 'User added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding user', error: err.message });
    }
});

// User Login
app.post("/api/userlogin", async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const results = await executeStoredProcedure('SP_GetByEmailId', [Email]);
        const user = results[0];

        if (!user) {
            return res.status(401).json({ message: "Invalid User" });
        }

        if (Password === user.Password) {
            const token = jwt.sign({ Email: user.Email }, privatekey, {
                expiresIn: "1h",
            });
            res.json({
                message: "Login Successful",
                token,
                user: { 
                    Email: user.Email,
                    First_Name: user.First_Name,
                    Last_Name: user.Last_Name
                }
            });
        } else {
            res.status(401).json({ message: "Wrong Password" });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Contact Us
app.post("/api/contact", async (req, res) => {
    const { Contact_Name, Contact_Email, Phone_Number, Contact_Message } = req.body;
    try {
        await executeStoredProcedure('ContactUs', [
            Contact_Name, Contact_Email, Phone_Number, Contact_Message
        ]);
        res.json({ message: "Contact Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding contact", error: err.message });
    }
});

// Get filtered products
app.get('/api/getproducts/:categoryId/:subcategoryId', async (req, res) => {
    try {
        const categoryId = parseInt(req.params.categoryId) || 0;
        const subcategoryId = parseInt(req.params.subcategoryId) || 0;
        
        const results = await executeStoredProcedure('GetProductByCatAndSubCat', [categoryId, subcategoryId]);
        const products = results.map(product => ({
            ...product,
            Product_Img: product.Product_Img || ''
        }));
        
        res.json({ products });
    } catch (err) {
        console.error('Error fetching filtered products:', err);
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
