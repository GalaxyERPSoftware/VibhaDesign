const mysql = require('mysql2/promise');
const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

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

const mysqlConfig = {
    host: 'auth-db1401.hstgr.io',
    user: 'u633565616_vvdesign',
    password: 'Vibha_DS01',
    database: 'u633565616_vvdesign',
    ssl: {
        rejectUnauthorized: false
    }
};

async function migrateData() {
    try {
        // Connect to both databases
        await sql.connect(mssqlConfig);
        const mysqlConnection = await mysql.createConnection(mysqlConfig);
        
        console.log('Connected to both databases');

        // Migrate Categories
        console.log('Migrating categories...');
        const categories = await sql.query`
            SELECT Name, Remark, TranType 
            FROM MiscellaneousMst 
            WHERE TranType = 'Category' AND Status = 'T'`;
        
        for (const cat of categories.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO Category (Name, Remark, TranType, Status) VALUES (?, ?, ?, ?)',
                [cat.Name, cat.Remark, 'category', 'active']
            );
        }

        // Migrate SubCategories
        console.log('Migrating subcategories...');
        const subcategories = await sql.query`
            SELECT m1.Name as SubCatName, m2.Name as CatName 
            FROM MiscellaneousMst m1 
            JOIN MiscellaneousMst m2 ON m1.Miscellaneous_ID = m2.Miscellaneous_ID 
            WHERE m1.TranType = 'Sub Category' AND m1.Status = 'T'`;
        
        for (const subcat of subcategories.recordset) {
            const [catRow] = await mysqlConnection.execute(
                'SELECT Category_Id FROM Category WHERE Name = ?',
                [subcat.CatName]
            );
            if (catRow[0]) {
                await mysqlConnection.execute(
                    'INSERT INTO SubCategory (Name, Category_Id, Status) VALUES (?, ?, ?)',
                    [subcat.SubCatName, catRow[0].Category_Id, 'active']
                );
            }
        }

        // Migrate Products
        console.log('Migrating products...');
        const products = await sql.query`
            SELECT Product_Name, Category_Id, Quantity, Rate, Remark, Product_Img 
            FROM ProductMst`;
            
        for (const prod of products.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO Product (Product_Name, Category_Id, Quantity, Rate, Remark, Status, Product_Img) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    prod.Product_Name,
                    prod.Category_Id,
                    prod.Quantity || 0,
                    prod.Rate || 0,
                    prod.Remark || '',
                    'active',
                    prod.Product_Img || ''
                ]
            );
        }

        // Migrate Users
        console.log('Migrating users...');
        const users = await sql.query`
            SELECT First_Name, Last_Name, Email, Password, Phone_Number, Address, City, Region, Zip_Code 
            FROM UserLogin`;
            
        for (const user of users.recordset) {
            try {
                await mysqlConnection.execute(
                    'INSERT INTO UserLogin (First_Name, Last_Name, Email, Password, Phone_Number, Address, City, Region, Zip_Code, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        user.First_Name || '',
                        user.Last_Name || '',
                        user.Email,
                        user.Password,
                        user.Phone_Number || '',
                        user.Address || '',
                        user.City || '',
                        user.Region || '',
                        user.Zip_Code || '',
                        'active'
                    ]
                );
            } catch (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log(`Skipping duplicate user: ${user.Email}`);
                } else {
                    throw err;
                }
            }
        }

        // Migrate Contact Messages
        console.log('Migrating contact messages...');
        const contacts = await sql.query`
            SELECT Contact_Name, Contact_Email, Phone_Number, Contact_Message 
            FROM ContactMst`;
            
        for (const contact of contacts.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO ContactUs (Contact_Name, Contact_Email, Phone_Number, Contact_Message, Status) VALUES (?, ?, ?, ?, ?)',
                [
                    contact.Contact_Name || '',
                    contact.Contact_Email || '',
                    contact.Phone_Number || '',
                    contact.Contact_Message || '',
                    'active'
                ]
            );
        }

        console.log('Migration completed successfully!');
        await mysqlConnection.end();
        await sql.close();

    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
}

migrateData(); 