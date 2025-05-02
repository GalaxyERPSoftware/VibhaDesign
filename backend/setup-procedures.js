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

async function setupProcedures() {
    try {
        // Connect to database
        const connection = await mysql.createConnection(config);
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

        // Create SP_Category
        console.log('Creating SP_Category...');
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

        // Create SP_SubCategory
        console.log('Creating SP_SubCategory...');
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

        // Create AddCategory
        console.log('Creating AddCategory...');
        await connection.query(`
            CREATE PROCEDURE AddCategory(IN p_Name VARCHAR(255), IN p_TranType VARCHAR(50))
            BEGIN
                IF p_TranType = 'Category' THEN
                    INSERT INTO Category (Name, TranType, Status) VALUES (p_Name, 'category', 'active');
                ELSEIF p_TranType = 'Sub Category' THEN
                    INSERT INTO SubCategory (Name, Category_Id, Status) 
                    VALUES (p_Name, (SELECT Category_Id FROM Category ORDER BY Created_Date DESC LIMIT 1), 'active');
                END IF;
            END
        `);

        // Create GenerateProductMST
        console.log('Creating GenerateProductMST...');
        await connection.query(`
            CREATE PROCEDURE GenerateProductMST(
                IN p_Product_Name VARCHAR(255),
                IN p_Category_Id INT,
                IN p_SubCategory_Id INT,
                IN p_Quantity DECIMAL(10,2),
                IN p_Rate DECIMAL(10,2),
                IN p_Remark TEXT,
                IN p_Status VARCHAR(10),
                IN p_Product_Img VARCHAR(500)
            )
            BEGIN
                INSERT INTO Product (
                    Product_Name, Category_Id, SubCategory_Id, 
                    Quantity, Rate, Remark, Status, Product_Img
                ) VALUES (
                    p_Product_Name, p_Category_Id, p_SubCategory_Id,
                    p_Quantity, p_Rate, p_Remark, 
                    CASE WHEN p_Status = '1' OR p_Status = 'Active' THEN 'active' ELSE 'inactive' END,
                    p_Product_Img
                );
            END
        `);

        // Create GetProductByCatAndSubCat
        console.log('Creating GetProductByCatAndSubCat...');
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

        // Create SP_GetByEmailId
        console.log('Creating SP_GetByEmailId...');
        await connection.query(`
            CREATE PROCEDURE SP_GetByEmailId(IN p_Email VARCHAR(255))
            BEGIN
                SELECT * FROM UserLogin WHERE Email = p_Email AND Status = 'active';
            END
        `);

        // Create GenerateUserLogin
        console.log('Creating GenerateUserLogin...');
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

        // Create ContactUs
        console.log('Creating ContactUs...');
        await connection.query(`
            CREATE PROCEDURE ContactUs(
                IN p_Contact_Name VARCHAR(50),
                IN p_Contact_Email VARCHAR(100),
                IN p_Phone_Number VARCHAR(20),
                IN p_Contact_Message TEXT
            )
            BEGIN
                INSERT INTO ContactUs (Contact_Name, Contact_Email, Phone_Number, Contact_Message, Status)
                VALUES (p_Contact_Name, p_Contact_Email, p_Phone_Number, p_Contact_Message, 'active');
            END
        `);

        console.log('All procedures created successfully!');
        await connection.end();

    } catch (error) {
        console.error('Error setting up procedures:', error);
        if (error.sqlMessage) {
            console.error('SQL Error:', error.sqlMessage);
        }
        process.exit(1);
    }
}

setupProcedures(); 