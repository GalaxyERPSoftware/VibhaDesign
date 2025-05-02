-- Drop existing tables if they exist
DROP TABLE IF EXISTS ContactUs;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS SubCategory;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS UserLogin;

-- Create Category table (MiscellaneousMst in MSSQL)
CREATE TABLE Category (
    Category_Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Remark TEXT,
    TranType VARCHAR(50) DEFAULT 'category',
    Status VARCHAR(10) DEFAULT 'active',
    Rate1 DECIMAL(10,2) DEFAULT 0.00,
    Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create SubCategory table
CREATE TABLE SubCategory (
    SubCategory_Id INT AUTO_INCREMENT PRIMARY KEY,
    Category_Id INT,
    Name VARCHAR(255) NOT NULL,
    Status VARCHAR(10) DEFAULT 'active',
    Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Category_Id) REFERENCES Category(Category_Id)
);

-- Create Product table (ProductMst in MSSQL)
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

-- Create UserLogin table
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

-- Create ContactUs table (ContactMst in MSSQL)
CREATE TABLE ContactUs (
    Contact_Id INT AUTO_INCREMENT PRIMARY KEY,
    Contact_Name VARCHAR(50) NOT NULL,
    Contact_Email VARCHAR(50) NOT NULL,
    Phone_Number VARCHAR(50),
    Contact_Message VARCHAR(1000),
    Status VARCHAR(10) DEFAULT 'active',
    Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stored procedures
DELIMITER //

-- Category procedures
CREATE PROCEDURE SP_Category(IN p_Category_Id INT)
BEGIN
    IF p_Category_Id = 0 THEN
        SELECT * FROM Category WHERE Status = 'active';
    ELSE
        SELECT * FROM Category WHERE Category_Id = p_Category_Id AND Status = 'active';
    END IF;
END //

-- SubCategory procedures
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
END //

-- Add Category procedure
CREATE PROCEDURE AddCategory(IN p_Name VARCHAR(255), IN p_TranType VARCHAR(50))
BEGIN
    IF p_TranType = 'category' THEN
        INSERT INTO Category (Name, TranType, Status) VALUES (p_Name, 'category', 'active');
    ELSEIF p_TranType = 'Sub Category' THEN
        INSERT INTO SubCategory (Name, Category_Id, Status) VALUES (p_Name, (SELECT Category_Id FROM Category ORDER BY Created_Date DESC LIMIT 1), 'active');
    END IF;
END //

-- Product procedures
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
        p_Quantity, p_Rate, p_Remark, p_Status, p_Product_Img
    );
END //

-- Get products by category and subcategory
CREATE PROCEDURE GetProductByCatAndSubCat(IN p_Category_Id INT, IN p_SubCategory_Id INT)
BEGIN
    SELECT p.*, c.Name as Category_Name, s.Name as SubCategory_Name
    FROM Product p
    JOIN Category c ON p.Category_Id = c.Category_Id
    JOIN SubCategory s ON p.SubCategory_Id = s.SubCategory_Id
    WHERE (p_Category_Id = 0 OR p.Category_Id = p_Category_Id)
    AND (p_SubCategory_Id = 0 OR p.SubCategory_Id = p_SubCategory_Id)
    AND p.Status = 'active';
END //

-- User procedures
CREATE PROCEDURE SP_GetByEmailId(IN p_Email VARCHAR(255))
BEGIN
    SELECT * FROM UserLogin WHERE Email = p_Email;
END //

CREATE PROCEDURE GenerateUserLogin(
    IN p_First_Name VARCHAR(50),
    IN p_Last_Name VARCHAR(50),
    IN p_Email VARCHAR(100),
    IN p_Password VARCHAR(255)
)
BEGIN
    INSERT INTO UserLogin (First_Name, Last_Name, Email, Password)
    VALUES (p_First_Name, p_Last_Name, p_Email, p_Password);
END //

-- Contact procedures
CREATE PROCEDURE ContactUs(
    IN p_Contact_Name VARCHAR(50),
    IN p_Contact_Email VARCHAR(50),
    IN p_Phone_Number VARCHAR(50),
    IN p_Contact_Message VARCHAR(1000)
)
BEGIN
    INSERT INTO ContactUs (Contact_Name, Contact_Email, Phone_Number, Contact_Message)
    VALUES (p_Contact_Name, p_Contact_Email, p_Phone_Number, p_Contact_Message);
END //

DELIMITER ; 