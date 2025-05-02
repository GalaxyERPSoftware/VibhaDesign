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
    TranType VARCHAR(50),
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
    Product_Name VARCHAR(255) NOT NULL,
    Category_Id INT,
    SubCategory_Id INT,
    Quantity DECIMAL(10,2) DEFAULT 0.00,
    Rate DECIMAL(10,2) DEFAULT 0.00,
    Remark TEXT,
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
    Phone_Number VARCHAR(20),
    Address VARCHAR(500),
    City VARCHAR(100),
    Region VARCHAR(100),
    Zip_Code VARCHAR(20),
    Status VARCHAR(10) DEFAULT 'active',
    Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ContactUs table (ContactMst in MSSQL)
CREATE TABLE ContactUs (
    Contact_Id INT AUTO_INCREMENT PRIMARY KEY,
    Contact_Name VARCHAR(50) NOT NULL,
    Contact_Email VARCHAR(100) NOT NULL,
    Phone_Number VARCHAR(20),
    Contact_Message TEXT,
    Status VARCHAR(10) DEFAULT 'active',
    Created_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 