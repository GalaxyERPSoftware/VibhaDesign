const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const dotenv = require('dotenv');

dotenv.config();

const config = {
    host: process.env.DB_HOST || 'auth-db1401.hstgr.io',
    user: process.env.DB_USER || 'u633565616_vvdesign',
    password: process.env.DB_PASSWORD || 'Vibha_DS01',
    database: process.env.DB_NAME || 'u633565616_vvdesign',
    ssl: {
        rejectUnauthorized: false
    },
    multipleStatements: true
};

async function executeSchema() {
    let connection;
    try {
        // Connect to database
        connection = await mysql.createConnection(config);
        console.log('Connected to database');

        // Drop existing procedures
        console.log('Dropping existing procedures...');
        await connection.query(`
            DROP PROCEDURE IF EXISTS SP_Category;
            DROP PROCEDURE IF EXISTS SP_SubCategory;
            DROP PROCEDURE IF EXISTS AddCategory;
            DROP PROCEDURE IF EXISTS GenerateProductMST;
            DROP PROCEDURE IF EXISTS GetProductByCatAndSubCat;
            DROP PROCEDURE IF EXISTS SP_GetByEmailId;
            DROP PROCEDURE IF EXISTS GenerateUserLogin;
            DROP PROCEDURE IF EXISTS ContactUs;
        `);

        // Drop existing tables
        console.log('Dropping existing tables...');
        await connection.query(`
            DROP TABLE IF EXISTS ContactUs;
            DROP TABLE IF EXISTS Product;
            DROP TABLE IF EXISTS SubCategory;
            DROP TABLE IF EXISTS Category;
            DROP TABLE IF EXISTS UserLogin;
        `);

        // Create tables
        console.log('Creating tables...');
        await connection.query(`
            CREATE TABLE Category (
                Category_Id INT AUTO_INCREMENT PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                Remark TEXT,
                TranType VARCHAR(50) DEFAULT 'category',
                Status VARCHAR(10) DEFAULT 'active',
                Rate1 DECIMAL(10,2) DEFAULT 0.00,
                Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE SubCategory (
                SubCategory_Id INT AUTO_INCREMENT PRIMARY KEY,
                Category_Id INT,
                Name VARCHAR(255) NOT NULL,
                Status VARCHAR(10) DEFAULT 'active',
                Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id)
            );

            CREATE TABLE Product (
                Product_Id INT AUTO_INCREMENT PRIMARY KEY,
                Product_Name VARCHAR(100) NOT NULL,
                Category_Id INT,
                SubCategory_Id INT,
                Quantity DECIMAL(10,2) DEFAULT 0.00,
                Rate DECIMAL(10,2) DEFAULT 0.00,
                Remark VARCHAR(1000),
                Status VARCHAR(10) DEFAULT 'active',
                Product_Img VARCHAR(500),
                cgst_rate DECIMAL(10,2) DEFAULT 0.00,
                sgst_rate DECIMAL(10,2) DEFAULT 0.00,
                igst_rate DECIMAL(10,2) DEFAULT 0.00,
                Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id),
                FOREIGN KEY (SubCategory_Id) REFERENCES SubCategory(SubCategory_Id)
            );

            CREATE TABLE UserLogin (
                User_Id INT AUTO_INCREMENT PRIMARY KEY,
                First_Name VARCHAR(50),
                Last_Name VARCHAR(50),
                Email VARCHAR(100) NOT NULL UNIQUE,
                Password VARCHAR(255) NOT NULL,
                Phone_Number VARCHAR(50),
                Address VARCHAR(500),
                City VARCHAR(50),
                Region VARCHAR(50),
                Zip_Code VARCHAR(50),
                Status VARCHAR(10) DEFAULT 'active',
                Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE ContactUs (
                Contact_Id INT AUTO_INCREMENT PRIMARY KEY,
                Contact_Name VARCHAR(50) NOT NULL,
                Contact_Email VARCHAR(50) NOT NULL,
                Phone_Number VARCHAR(50),
                Contact_Message VARCHAR(1000),
                Status VARCHAR(10) DEFAULT 'active',
                Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Tables created successfully');

        // Create procedures
        console.log('Creating procedures...');
        
        // SP_Category
        await connection.query(`
            CREATE PROCEDURE SP_Category(IN p_Category_Id INT)
            BEGIN
                IF p_Category_Id = 0 THEN
                    SELECT * FROM Category WHERE Status = 'active';
                ELSE
                    SELECT * FROM Category WHERE Category_Id = p_Category_Id AND Status = 'active';
                END IF;
            END
        `);

        // SP_SubCategory
        await connection.query(`
            CREATE PROCEDURE SP_SubCategory(IN p_SubCategory_Id INT)
            BEGIN
                IF p_SubCategory_Id = 0 THEN
                    SELECT s.*, c.Name as Category_Name 
                    FROM SubCategory s
                    JOIN Category c ON s.Category_Id = c.Category_Id
                    WHERE s.Status = 'active';
                ELSE
                    SELECT s.*, c.Name as Category_Name 
                    FROM SubCategory s
                    JOIN Category c ON s.Category_Id = c.Category_Id
                    WHERE s.SubCategory_Id = p_SubCategory_Id AND s.Status = 'active';
                END IF;
            END
        `);

        // AddCategory
        await connection.query(`
            CREATE PROCEDURE AddCategory(IN p_Name VARCHAR(255), IN p_TranType VARCHAR(50))
            BEGIN
                IF p_TranType = 'category' THEN
                    INSERT INTO Category (Name, TranType, Status) 
                    VALUES (p_Name, 'category', 'active');
                ELSEIF p_TranType = 'subcategory' THEN
                    INSERT INTO SubCategory (Name, Category_Id, Status) 
                    VALUES (p_Name, (SELECT Category_Id FROM Category ORDER BY Created_Date DESC LIMIT 1), 'active');
                END IF;
            END
        `);

        // GenerateProductMST
        await connection.query(`
            CREATE PROCEDURE GenerateProductMST(
                IN p_Product_Name VARCHAR(100),
                IN p_Category_Id INT,
                IN p_SubCategory_Id INT,
                IN p_Quantity DECIMAL(10,2),
                IN p_Rate DECIMAL(10,2),
                IN p_Remark VARCHAR(1000),
                IN p_Product_Img VARCHAR(500)
            )
            BEGIN
                INSERT INTO Product (
                    Product_Name, Category_Id, SubCategory_Id, 
                    Quantity, Rate, Remark, Status, Product_Img
                ) VALUES (
                    p_Product_Name, p_Category_Id, p_SubCategory_Id,
                    COALESCE(p_Quantity, 0), COALESCE(p_Rate, 0), p_Remark, 
                    'active', p_Product_Img
                );
            END
        `);

        // GetProductByCatAndSubCat
        await connection.query(`
            CREATE PROCEDURE GetProductByCatAndSubCat(IN p_Category_Id INT, IN p_SubCategory_Id INT)
            BEGIN
                SELECT p.*, c.Name as Category_Name, s.Name as SubCategory_Name
                FROM Product p
                LEFT JOIN Category c ON p.Category_Id = c.Category_Id
                LEFT JOIN SubCategory s ON p.SubCategory_Id = s.SubCategory_Id
                WHERE (p_Category_Id = 0 OR p.Category_Id = p_Category_Id)
                AND (p_SubCategory_Id = 0 OR p.SubCategory_Id = p_SubCategory_Id)
                AND p.Status = 'active';
            END
        `);

        // SP_GetByEmailId
        await connection.query(`
            CREATE PROCEDURE SP_GetByEmailId(IN p_Email VARCHAR(100))
            BEGIN
                SELECT * FROM UserLogin WHERE Email = p_Email AND Status = 'active';
            END
        `);

        // GenerateUserLogin
        await connection.query(`
            CREATE PROCEDURE GenerateUserLogin(
                IN p_First_Name VARCHAR(50),
                IN p_Last_Name VARCHAR(50),
                IN p_Email VARCHAR(100),
                IN p_Password VARCHAR(255)
            )
            BEGIN
                INSERT INTO UserLogin (First_Name, Last_Name, Email, Password, Status)
                VALUES (p_First_Name, p_Last_Name, p_Email, p_Password, 'active');
            END
        `);

        // ContactUs
        await connection.query(`
            CREATE PROCEDURE ContactUs(
                IN p_Contact_Name VARCHAR(50),
                IN p_Contact_Email VARCHAR(50),
                IN p_Phone_Number VARCHAR(50),
                IN p_Contact_Message VARCHAR(1000)
            )
            BEGIN
                INSERT INTO ContactUs (Contact_Name, Contact_Email, Phone_Number, Contact_Message, Status)
                VALUES (p_Contact_Name, p_Contact_Email, p_Phone_Number, p_Contact_Message, 'active');
            END
        `);

        console.log('All procedures created successfully!');
        console.log('Schema setup completed');

    } catch (error) {
        console.error('Error executing schema:', error);
        if (error.sqlMessage) {
            console.error('SQL Error:', error.sqlMessage);
        }
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

executeSchema(); 