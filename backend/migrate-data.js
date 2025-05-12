const mysql = require('mysql2/promise');
const sql = require('mssql');

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
    host: 'srv1401.hstgr.io',
    user: 'u633565616_vvdesign',
    password: 'Vibha_DS01',
    database: 'u633565616_vvdesign',
    ssl: { rejectUnauthorized: false }
};

async function migrateData() {
    let mssqlConnection;
    let mysqlConnection;
    try {
        // Connect to both databases
        await sql.connect(mssqlConfig);
        mysqlConnection = await mysql.createConnection(mysqlConfig);
        console.log('Connected to both databases');

        // 1. Migrate ContactMst
        console.log('Migrating ContactMst...');
        const contacts = await sql.query`SELECT * FROM ContactMst`;
        for (const contact of contacts.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO ContactMst (Contact_Id, Contact_Name, Contact_Email, Phone_Number, Contact_Message) VALUES (?, ?, ?, ?, ?)',
                [contact.Contact_Id, contact.Contact_Name, contact.Contact_Email, contact.Phone_Number, contact.Contact_Message]
            );
        }

        // 2. Migrate MiscellaneousMst
        console.log('Migrating MiscellaneousMst...');
        const misc = await sql.query`SELECT * FROM MiscellaneousMst`;
        for (const row of misc.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO MiscellaneousMst (Miscellaneous_ID, Name, Remark, TranType, Status, Rate1) VALUES (?, ?, ?, ?, ?, ?)',
                [row.Miscellaneous_ID, row.Name, row.Remark, row.TranType, row.Status, row.Rate1]
            );
        }

        // 3. Migrate ProductMst
        console.log('Migrating ProductMst...');
        const products = await sql.query`SELECT * FROM ProductMst`;
        for (const prod of products.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO ProductMst (Product_Id, Product_Name, Category_Id, SubCategory_Id, Quantity, Rate, Remark, Status, Product_Img, cgst_rate, sgst_rate, igst_rate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [prod.Product_Id, prod.Product_Name, prod.Category_Id, prod.SubCategory_Id, prod.Quantity, prod.Rate, prod.Remark, prod.Status, prod.Product_Img, prod.cgst_rate, prod.sgst_rate, prod.igst_rate]
            );
        }

        // 4. Migrate TMPMiscellaneousMst
        console.log('Migrating TMPMiscellaneousMst...');
        const tmpmisc = await sql.query`SELECT * FROM TMPMiscellaneousMst`;
        for (const row of tmpmisc.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO TMPMiscellaneousMst (Miscellaneous_ID, Name, Remark, TranType, Status, Rate1) VALUES (?, ?, ?, ?, ?, ?)',
                [row.Miscellaneous_ID, row.Name, row.Remark, row.TranType, row.Status, row.Rate1]
            );
        }

        // 5. Migrate tmpul
        console.log('Migrating tmpul...');
        const tmpul = await sql.query`SELECT * FROM tmpul`;
        for (const row of tmpul.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO tmpul (User_Id, First_Name, Last_Name, Email, Password, Phone_Number, Address, City, Region, Zip_Code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [row.User_Id, row.First_Name, row.Last_Name, row.Email, row.Password, row.Phone_Number, row.Address, row.City, row.Region, row.Zip_Code]
            );
        }

        // 6. Migrate UserLogin
        console.log('Migrating UserLogin...');
        const users = await sql.query`SELECT * FROM UserLogin`;
        for (const user of users.recordset) {
            await mysqlConnection.execute(
                'INSERT INTO UserLogin (UserID, First_Name, Last_Name, Email, Password, Phone_Number, Address, City, Region, Zip_Code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [user.UserID, user.First_Name, user.Last_Name, user.Email, user.Password, user.Phone_Number, user.Address, user.City, user.Region, user.Zip_Code]
            );
        }

        console.log('Data migration completed successfully!');
        await mysqlConnection.end();
        await sql.close();
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
}

migrateData(); 