const mysql = require('mysql2/promise');

// MySQL connection config (from Hostinger screenshots)
const config = {
    host: 'srv1401.hstgr.io',
    user: 'u633565616_vvdesign',
    password: 'Vibha_DS01', // <-- Actual password provided by user
    database: 'u633565616_vvdesign', // correct lowercase database name
    ssl: { rejectUnauthorized: false },
    multipleStatements: true
};

async function setupSchema() {
    let connection;
    try {
        connection = await mysql.createConnection(config);
        console.log('Connected to MySQL, database:', config.database);

        // Disable foreign key checks
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        // Drop all tables shown in the screenshot, using exact names/case
        await connection.query(`
            DROP TABLE IF EXISTS Category;
            DROP TABLE IF EXISTS ContactMst;
            DROP TABLE IF EXISTS ContactUs;
            DROP TABLE IF EXISTS MiscellaneousMst;
            DROP TABLE IF EXISTS Product;
            DROP TABLE IF EXISTS ProductMst;
            DROP TABLE IF EXISTS SubCategory;
            DROP TABLE IF EXISTS TMPMiscellaneousMst;
            DROP TABLE IF EXISTS tmpul;
            DROP TABLE IF EXISTS UserLogin;
            DROP TABLE IF EXISTS New;
        `);
        // Re-enable foreign key checks
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Dropped all tables (including irrelevant ones)');

        // Print final list of tables for verification
        const [tables] = await connection.query("SHOW TABLES");
        console.log('Tables after drop:');
        tables.forEach(row => console.log(Object.values(row)[0]));

        // Now recreate only the correct tables (matching MSSQL)
        await connection.query(`
            CREATE TABLE ContactMst (
                Contact_Id INT AUTO_INCREMENT PRIMARY KEY,
                Contact_Name VARCHAR(50),
                Contact_Email VARCHAR(50),
                Phone_Number VARCHAR(50),
                Contact_Message VARCHAR(1000)
            );

            CREATE TABLE MiscellaneousMst (
                Miscellaneous_ID INT AUTO_INCREMENT PRIMARY KEY,
                Name VARCHAR(50),
                Remark VARCHAR(50),
                TranType VARCHAR(50),
                Status VARCHAR(50),
                Rate1 DECIMAL(18,2) NOT NULL
            );

            CREATE TABLE ProductMst (
                Product_Id INT AUTO_INCREMENT PRIMARY KEY,
                Product_Name VARCHAR(100),
                Category_Id INT,
                SubCategory_Id INT,
                Quantity DECIMAL(18,0),
                Rate DECIMAL(18,0),
                Remark VARCHAR(1000),
                Status VARCHAR(10),
                Product_Img VARCHAR(500),
                cgst_rate DECIMAL(18,2) NOT NULL,
                sgst_rate DECIMAL(18,2) NOT NULL,
                igst_rate DECIMAL(18,2) NOT NULL
            );

            CREATE TABLE TMPMiscellaneousMst (
                Miscellaneous_ID INT AUTO_INCREMENT PRIMARY KEY,
                Name VARCHAR(100),
                Remark VARCHAR(250),
                TranType VARCHAR(50),
                Status VARCHAR(2),
                Rate1 DECIMAL(18,2) NOT NULL
            );

            CREATE TABLE tmpul (
                User_Id INT AUTO_INCREMENT PRIMARY KEY,
                First_Name VARCHAR(50),
                Last_Name VARCHAR(50),
                Email VARCHAR(100),
                Password VARCHAR(50),
                Phone_Number VARCHAR(50),
                Address VARCHAR(500),
                City VARCHAR(50),
                Region VARCHAR(50),
                Zip_Code VARCHAR(50)
            );

            CREATE TABLE UserLogin (
                UserID INT AUTO_INCREMENT PRIMARY KEY,
                First_Name VARCHAR(50),
                Last_Name VARCHAR(50),
                Email VARCHAR(100),
                Password VARCHAR(50),
                Phone_Number VARCHAR(50),
                Address VARCHAR(500),
                City VARCHAR(50),
                Region VARCHAR(50),
                Zip_Code VARCHAR(50)
            );
        `);
        console.log('Created only relevant tables');

        // Print final list of tables for verification
        const [finalTables] = await connection.query("SHOW TABLES");
        console.log('Final tables in MySQL:');
        finalTables.forEach(row => console.log(Object.values(row)[0]));

        // Drop existing procedures if any
        await connection.query(`
            DROP PROCEDURE IF EXISTS SP_APP_GetProductImage;
            DROP PROCEDURE IF EXISTS GetProductDetails;
            DROP PROCEDURE IF EXISTS GenerateProductMST;
            DROP PROCEDURE IF EXISTS SP_Category;
            DROP PROCEDURE IF EXISTS SP_SubCategory;
            DROP PROCEDURE IF EXISTS GetProductByCatAndSubCat;
            DROP PROCEDURE IF EXISTS GenerateUserLogin;
            DROP PROCEDURE IF EXISTS sp_updateuserlogin;
            DROP PROCEDURE IF EXISTS GenerateLoginUser;
            DROP PROCEDURE IF EXISTS SP_GetByEmailId;
            DROP PROCEDURE IF EXISTS SP_GetMaxRow;
            DROP PROCEDURE IF EXISTS AddCategory;
            DROP PROCEDURE IF EXISTS ContactUs;
            DROP PROCEDURE IF EXISTS GetContact;
        `);
        console.log('Dropped existing procedures');

        // Create stored procedures (MySQL syntax, adapted from MSSQL)
        const procedures = [
            `CREATE PROCEDURE SP_APP_GetProductImage(IN Product_id INT)
            BEGIN
                IF Product_id >= 0 THEN
                    SELECT Product_Img FROM ProductMst WHERE Product_Id = Product_id;
                ELSE
                    SELECT Product_Img FROM ProductMst;
                END IF;
            END`,
            `CREATE PROCEDURE GetProductDetails(IN Product_Id INT)
            BEGIN
                SELECT pm.*, c.Name AS category, sc.Name AS SubCategory
                FROM ProductMst pm
                LEFT JOIN MiscellaneousMst c ON pm.Category_Id = c.Miscellaneous_ID AND c.TranType = 'category'
                LEFT JOIN MiscellaneousMst sc ON pm.SubCategory_Id = sc.Miscellaneous_ID AND sc.TranType = 'Sub Category'
                WHERE pm.Product_Id = Product_Id;
            END`,
            `CREATE PROCEDURE GenerateProductMST(
                IN Product_Name VARCHAR(100),
                IN Category_Id INT,
                IN SubCategory_Id INT,
                IN Quantity DECIMAL(18,0),
                IN Rate DECIMAL(18,0),
                IN Remark VARCHAR(1000),
                IN Status VARCHAR(10),
                IN Product_Img VARCHAR(500)
            )
            BEGIN
                INSERT INTO ProductMst(Product_Name, Category_Id, SubCategory_Id, Quantity, Rate, Remark, Status, Product_Img)
                VALUES(Product_Name, Category_Id, SubCategory_Id, Quantity, Rate, Remark, Status, Product_Img);
            END`,
            `CREATE PROCEDURE SP_Category(IN Category_Id INT)
            BEGIN
                SELECT * FROM MiscellaneousMst WHERE TranType = 'category';
            END`,
            `CREATE PROCEDURE SP_SubCategory(IN SubCategory_Id INT)
            BEGIN
                SELECT * FROM MiscellaneousMst WHERE TranType = 'Sub Category';
            END`,
            `CREATE PROCEDURE GetProductByCatAndSubCat(IN Category_Id INT, IN SubCategory_Id INT)
            BEGIN
                SELECT * FROM ProductMst;
            END`,
            `CREATE PROCEDURE GenerateUserLogin(
                IN First_Name VARCHAR(100),
                IN Last_Name VARCHAR(100),
                IN Email VARCHAR(50),
                IN Password VARCHAR(50)
            )
            BEGIN
                INSERT INTO UserLogin(First_Name, Last_Name, Email, Password)
                VALUES(First_Name, Last_Name, Email, Password);
            END`,
            `CREATE PROCEDURE sp_updateuserlogin(
                IN userid INT,
                IN Phone_Number VARCHAR(50),
                IN Address VARCHAR(500),
                IN City VARCHAR(50),
                IN Region VARCHAR(50),
                IN Zip_Code VARCHAR(50)
            )
            BEGIN
                UPDATE UserLogin SET Phone_Number = Phone_Number, Address = Address, City = City, Region = Region, Zip_Code = Zip_Code WHERE UserID = userid;
            END`,
            `CREATE PROCEDURE GenerateLoginUser(
                IN Email VARCHAR(50),
                IN Password VARCHAR(50)
            )
            BEGIN
                SELECT * FROM UserLogin WHERE Email = Email AND Password = Password;
            END`,
            `CREATE PROCEDURE SP_GetByEmailId(IN email VARCHAR(100))
            BEGIN
                IF email <> '0' THEN
                    SELECT * FROM UserLogin WHERE Email = email;
                ELSE
                    SELECT * FROM UserLogin;
                END IF;
            END`,
            `CREATE PROCEDURE SP_GetMaxRow(
                IN tablename VARCHAR(100),
                IN columnname VARCHAR(100)
            )
            BEGIN
                SET @str = CONCAT('SELECT IFNULL(MAX(', columnname, '),0) AS MaxRow FROM ', tablename);
                PREPARE stmt FROM @str;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;
            END`,
            `CREATE PROCEDURE AddCategory(
                IN Name VARCHAR(50),
                IN TranType VARCHAR(50)
            )
            BEGIN
                INSERT INTO MiscellaneousMst(Name, Remark, TranType, Status, Rate1) VALUES(Name, TranType, TranType, 'T', 0);
            END`,
            `CREATE PROCEDURE ContactUs(
                IN Contact_Name VARCHAR(50),
                IN Contact_Email VARCHAR(50),
                IN Phone_Number VARCHAR(50),
                IN Contact_Message VARCHAR(1000)
            )
            BEGIN
                INSERT INTO ContactMst(Contact_Name, Contact_Email, Phone_Number, Contact_Message)
                VALUES(Contact_Name, Contact_Email, Phone_Number, Contact_Message);
            END`,
            `CREATE PROCEDURE GetContact(IN Contact_Id INT)
            BEGIN
                SELECT * FROM ContactMst WHERE Contact_Id = Contact_Id;
            END`
        ];
        for (const proc of procedures) {
            try {
                await connection.query(proc);
            } catch (err) {
                console.error('Error creating procedure:', err.sqlMessage || err.message);
            }
        }
        console.log('Created stored procedures');

        console.log('MySQL schema setup completed successfully!');
    } catch (err) {
        console.error('Error setting up schema:', err);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

setupSchema(); 