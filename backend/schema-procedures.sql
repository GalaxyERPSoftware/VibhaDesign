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
        INSERT INTO Category (Name, TranType, Status) 
        VALUES (p_Name, 'category', 'active');
    ELSEIF p_TranType = 'subcategory' THEN
        INSERT INTO SubCategory (Name, Category_Id, Status) 
        VALUES (p_Name, (SELECT Category_Id FROM Category ORDER BY Created_Date DESC LIMIT 1), 'active');
    END IF;
END //

-- Product procedures
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
END //

-- Get products by category and subcategory
CREATE PROCEDURE GetProductByCatAndSubCat(IN p_Category_Id INT, IN p_SubCategory_Id INT)
BEGIN
    SELECT p.*, c.Name as Category_Name, s.Name as SubCategory_Name
    FROM Product p
    LEFT JOIN Category c ON p.Category_Id = c.Category_Id
    LEFT JOIN SubCategory s ON p.SubCategory_Id = s.SubCategory_Id
    WHERE (p_Category_Id = 0 OR p.Category_Id = p_Category_Id)
    AND (p_SubCategory_Id = 0 OR p.SubCategory_Id = p_SubCategory_Id)
    AND p.Status = 'active';
END //

-- User procedures
CREATE PROCEDURE SP_GetByEmailId(IN p_Email VARCHAR(100))
BEGIN
    SELECT * FROM UserLogin WHERE Email = p_Email AND Status = 'active';
END //

CREATE PROCEDURE GenerateUserLogin(
    IN p_First_Name VARCHAR(50),
    IN p_Last_Name VARCHAR(50),
    IN p_Email VARCHAR(100),
    IN p_Password VARCHAR(255)
)
BEGIN
    INSERT INTO UserLogin (First_Name, Last_Name, Email, Password, Status)
    VALUES (p_First_Name, p_Last_Name, p_Email, p_Password, 'active');
END //

-- Contact procedures
CREATE PROCEDURE ContactUs(
    IN p_Contact_Name VARCHAR(50),
    IN p_Contact_Email VARCHAR(50),
    IN p_Phone_Number VARCHAR(50),
    IN p_Contact_Message VARCHAR(1000)
)
BEGIN
    INSERT INTO ContactUs (Contact_Name, Contact_Email, Phone_Number, Contact_Message, Status)
    VALUES (p_Contact_Name, p_Contact_Email, p_Phone_Number, p_Contact_Message, 'active');
END //

DELIMITER ; 