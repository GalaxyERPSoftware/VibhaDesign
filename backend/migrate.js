const mssql = require('mssql');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// MSSQL Configuration
const mssqlConfig = {
    user: 'galaxy',
    password: 'jaigurudev',
    database: 'VibhaDesignStudio',
    server: 'gi12',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// MySQL Configuration
const mysqlConfig = {
    host: process.env.DB_HOST || 'auth-db1401.hstgr.io',
    user: process.env.DB_USER || 'u633565616_vvdesign',
    password: process.env.DB_PASSWORD || 'Vibha_DS01',
    database: process.env.DB_NAME || 'u633565616_vvdesign',
    ssl: {
        rejectUnauthorized: false
    }
};

async function migrateData() {
    let mssqlConnection;
    let mysqlConnection;
    try {
        // Connect to both databases
        mssqlConnection = await mssql.connect(mssqlConfig);
        mysqlConnection = await mysql.createConnection(mysqlConfig);

        console.log('Connected to both databases');

        // First, let's check the structure of MiscellaneousMst
        console.log('Checking MiscellaneousMst structure...');
        const tableInfo = await mssql.query`
            SELECT COLUMN_NAME, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'MiscellaneousMst'`;
        
        console.log('MiscellaneousMst columns:', tableInfo.recordset.map(col => col.COLUMN_NAME).join(', '));

        // 1. Migrate Categories from MiscellaneousMst
        console.log('Migrating Categories...');
        const categories = await mssql.query`
            SELECT DISTINCT Name, Remark, Status, Rate1
            FROM MiscellaneousMst 
            WHERE TranType = 'Category'`;
        
        const categoryMap = new Map();
        
        for (const category of categories.recordset) {
            try {
                const [result] = await mysqlConnection.execute(
                    'INSERT INTO Category (Name, Remark, TranType, Status, Rate1) VALUES (?, ?, ?, ?, ?)',
                    [
                        category.Name,
                        category.Remark || null,
                        'category',
                        'active',
                        category.Rate1 || 0
                    ]
                );
                categoryMap.set(category.Name, result.insertId);
                console.log(`Migrated category: ${category.Name}`);
            } catch (err) {
                console.log(`Error migrating category ${category.Name}:`, err.message);
            }
        }

        // 2. Migrate SubCategories from MiscellaneousMst
        console.log('Migrating SubCategories...');
        const subcategories = await mssql.query`
            SELECT DISTINCT m1.Name as SubCategoryName, m2.Name as CategoryName
            FROM MiscellaneousMst m1
            JOIN MiscellaneousMst m2 ON m1.Miscellaneous_ID = m2.Miscellaneous_ID
            WHERE m1.TranType = 'Sub Category' AND m2.TranType = 'Category'`;
        
        const subcategoryMap = new Map();
        
        for (const subcategory of subcategories.recordset) {
            try {
                const categoryId = categoryMap.get(subcategory.CategoryName);
                if (categoryId) {
                    const [result] = await mysqlConnection.execute(
                        'INSERT INTO SubCategory (Category_Id, Name, Status) VALUES (?, ?, ?)',
                        [
                            categoryId,
                            subcategory.SubCategoryName,
                            'active'
                        ]
                    );
                    subcategoryMap.set(subcategory.SubCategoryName, result.insertId);
                    console.log(`Migrated subcategory: ${subcategory.SubCategoryName}`);
                }
            } catch (err) {
                console.log(`Error migrating subcategory ${subcategory.SubCategoryName}:`, err.message);
            }
        }

        // 3. Migrate Products
        console.log('Migrating Products...');
        const products = await mssql.query`
            SELECT p.*, c.Name as CategoryName, s.Name as SubCategoryName
            FROM ProductMst p
            LEFT JOIN MiscellaneousMst c ON p.Category_Id = c.Miscellaneous_ID AND c.TranType = 'Category'
            LEFT JOIN MiscellaneousMst s ON p.SubCategory_Id = s.Miscellaneous_ID AND s.TranType = 'Sub Category'`;

        for (const product of products.recordset) {
            try {
                const categoryId = product.CategoryName ? categoryMap.get(product.CategoryName) : null;
                const subcategoryId = product.SubCategoryName ? subcategoryMap.get(product.SubCategoryName) : null;
                
                await mysqlConnection.execute(
                    'INSERT INTO Product (Product_Name, Category_Id, SubCategory_Id, Quantity, Rate, Remark, Status, Product_Img, cgst_rate, sgst_rate, igst_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        product.Product_Name,
                        categoryId,
                        subcategoryId,
                        product.Quantity || 0,
                        product.Rate || 0,
                        product.Remark || null,
                        'active',
                        product.Product_Img || null,
                        product.cgst_rate || 0,
                        product.sgst_rate || 0,
                        product.igst_rate || 0
                    ]
                );
                console.log(`Migrated product: ${product.Product_Name}`);
            } catch (err) {
                console.log(`Error migrating product ${product.Product_Name}:`, err.message);
            }
        }

        // 4. Migrate UserLogin
        console.log('Migrating Users...');
        const users = await mssql.query`SELECT * FROM UserLogin`;
        
        for (const user of users.recordset) {
            try {
                await mysqlConnection.execute(
                    'INSERT INTO UserLogin (First_Name, Last_Name, Email, Password, Phone_Number, Address, City, Region, Zip_Code, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        user.First_Name || null,
                        user.Last_Name || null,
                        user.Email,
                        user.Password,
                        user.Phone_Number || null,
                        user.Address || null,
                        user.City || null,
                        user.Region || null,
                        user.Zip_Code || null,
                        'active'
                    ]
                );
                console.log(`Migrated user: ${user.Email}`);
            } catch (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log(`Skipping duplicate user: ${user.Email}`);
                } else {
                    console.log(`Error migrating user ${user.Email}:`, err.message);
                }
            }
        }

        // 5. Migrate ContactUs
        console.log('Migrating Contact Messages...');
        const contacts = await mssql.query`SELECT * FROM ContactMst`;
        
        for (const contact of contacts.recordset) {
            try {
                await mysqlConnection.execute(
                    'INSERT INTO ContactUs (Contact_Name, Contact_Email, Phone_Number, Contact_Message, Status) VALUES (?, ?, ?, ?, ?)',
                    [
                        contact.Contact_Name,
                        contact.Contact_Email,
                        contact.Phone_Number || null,
                        contact.Contact_Message || null,
                        'active'
                    ]
                );
                console.log(`Migrated contact from: ${contact.Contact_Email}`);
            } catch (err) {
                console.log(`Error migrating contact ${contact.Contact_Email}:`, err.message);
            }
        }

        console.log('Migration completed successfully!');
        
    } catch (error) {
        console.error('Migration failed:', error);
        if (error.originalError) {
            console.error('Original error:', error.originalError);
        }
        process.exit(1);
    } finally {
        // Close connections
        if (mssqlConnection) {
            await mssql.close();
        }
        if (mysqlConnection) {
            await mysqlConnection.end();
        }
    }
}

// Run the migration
migrateData(); 