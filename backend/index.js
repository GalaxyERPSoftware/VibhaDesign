import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import sql from './db.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { config } from 'process';
import fs from 'fs';
import jwt from "jsonwebtoken";
const privatekey = "j#n2005@l";




const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


// ---------------------------Image--------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

// ---------------------------Add product------------------------------

app.post('/api/addproduct', upload.single('Product_Img'), async (req, res) => {
    const { Product_Name, Category_Id, SubCategory_Id, Quantity, Rate, Remark, Status } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Product image is required.' });
    }

    const imagePath = `/img/${req.file.filename}`; // Save relative image path

    try {
        await sql.connect(config);
        const request = new sql.Request();

        // Add inputs properly
        request.input('Product_Name', sql.VarChar(20), Product_Name);
        request.input('Category_Id', sql.Int, Category_Id);
        request.input('SubCategory_Id', sql.Int, SubCategory_Id);
        request.input('Quantity', sql.Numeric(18, 0), Quantity);
        request.input('Rate', sql.Numeric(18, 0), Rate);
        request.input('Remark', sql.VarChar(1000), Remark);
        request.input('Status', sql.VarChar(10), Status);
        request.input('Product_Img', sql.NVarChar(500), imagePath); // Save path (not image binary)

        // Execute stored procedure
        await request.execute('GenerateProductMST'); // 👈 your SP name

        res.json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding product', error: err.message });
    }
});


// --------------------------------Category------------------------------

app.get('/api/getcategory', async (req, res) => {
    try {
        const result = await sql.query`EXEC SP_Category 0 `;
        res.json({ category: result.recordset });  // Wrapped in "category" key
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ---------------------------SubCategory--------------------------------

app.get('/api/getsubcategory', async (req, res) => {
    try {
        const result = await sql.query`EXEC SP_SubCategory 0 `;
        res.json({ subCategory: result.recordset });  // Wrapped in "subcategory" key
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// ---------------------------Add category------------------------------

app.post('/api/addcategory', async (req, res) => {
    const { Name, TranType } = req.body;

    try {
        if (!['Category', 'Sub Category'].includes(TranType)) {
            return res.status(400).json({ message: 'TranType must be "Category" or "Sub Category"' });
        }
        await sql.connect(config);
        const request = new sql.Request();
        
        request.input('Name', sql.VarChar(50), Name);
        request.input('TranType', sql.VarChar(50), TranType);
    
        await request.execute('AddCategory');

        res.json({ message: 'Added successfully' });
    } catch (err) {
        console.error('Full error:', err);
        res.status(500).json({
            message: 'Error adding product',
            error: err.originalError?.info?.message || err.message || 'Unknown error'
        });
    }
});

// ---------------------------Product view---------------------------------

app.get('/api/productview', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`EXEC GetProductByCatAndSubCat 0, 0`;

        const products = result.recordset.map(product => {
            product.Product_Img = product.Product_Img || '';
            return product;
        });

        res.json({ ProductView: products });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

// -------------------------Product Image API------------------------------

app.get("/api/productimage", async (req, res) => {
    const Product_Id = parseInt(req.query.Product_Id); // Get from query string
  
    try {
      await sql.connect(config);
  
      const request = new sql.Request();
      request.input("Product_Id", sql.Int, Product_Id);
  
      const result = await request.execute("SP_APP_GetProductImage");
  
      const products = result.recordset.map((product) => {
        product.Product_Img = product.Product_Img || ''; // If null, set empty string
        return product;
      });
  
      res.json(products);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching product image",
        error: err.message
      });
    }
  });

// -------------------------Single Product View------------------------------

  app.get("/api/viewsinglepage", async (req, res) => {
    const{Product_Id}=req.body;
    try {
        await sql.connect(config);
  
        const request = new sql.Request();

        request.input("Product_Id", sql.Int, Product_Id);
    
         const result=await request.execute("GetProductDetails");
         res.json({ ProductDetails:result.recordset });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// ---------------------------User Register------------------------

app.post('/api/userregister',  async (req, res) => {
    const { First_Name, Last_Name, Email, Password } = req.body;
     try {
        
        const checkRequest = new sql.Request();
        checkRequest.input('Email', sql.VarChar(50), Email);
    
        const checkResult = await checkRequest.execute('SP_GetByEmailId');
    
        if (checkResult.recordset.length > 0) {
          // Email exists, do not register
          return res.status(400).json({ message: 'Email already registered' });
        }
        await sql.connect(config);
        const request = new sql.Request();
        request.input('First_Name', sql.VarChar(100), First_Name);
        request.input('Last_Name', sql.VarChar(100), Last_Name);
        request.input('Email', sql.VarChar(50), Email);
        request.input('Password', sql.VarChar(1000), Password );
        

        await request.execute('GenerateUserLogin');
        
        
        
        res.json({ message: 'User added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding product', error: err.message });
    }
});

// ---------------------------User Login------------------------

app.post("/api/userlogin", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    await sql.connect(config);

    const request = new sql.Request();
    request.input("Email", sql.VarChar(50), Email);

    const result = await request.execute("SP_GetByEmailId");
    const user = result.recordset[0]; // Get the first row

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    
    if (Password === user.Password) {
      const token = jwt.sign({ Email: user.Email }, privatekey, {
        expiresIn: "1h",
      });

      res.json({
        message: "Login success",
        token,
        user: { Email: user.Email },
      });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// ---------------------------ContactUs------------------------


 app.post("/api/contact", async (req, res) => {
  const { Contact_Name, Contact_Email, Phone_Number, Contact_Message } =
    req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("Contact_Name", sql.VarChar(50), Contact_Name);
    request.input("Contact_Email", sql.VarChar(50), Contact_Email);
    request.input("Phone_Number", sql.VarChar(50), Phone_Number);
    request.input("Contact_Message", sql.VarChar(1000), Contact_Message);
    await request.execute("ContactUs");

    res.json({ message: "Contact Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding contact", error: err.message });
  }
});

// ---------------------------Get ContactUs------------------------

app.get('/api/getcontactus', async (req, res) => {
    try {
        const result = await sql.query`GetContact 0`;
        res.json({ ContactUs: result.recordset });  // Wrapped in "ContactUs" key
    } catch (err) {
        res.status(500).send(err.message);
    }

});



app.listen(8088, '192.168.1.9', () => {
    console.log('🚀 Server running on http://192.168.1.9:8088');
});
