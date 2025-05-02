const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    host: process.env.DB_HOST || 'auth-db1401.hstgr.io',
    user: process.env.DB_USER || 'u633565616_vvdesign',
    password: process.env.DB_PASSWORD || 'Vibha_DS01',
    database: process.env.DB_NAME || 'u633565616_vvdesign',
    ssl: {
        rejectUnauthorized: false
    }
};

async function updateStatus() {
    try {
        // Connect to database
        const connection = await mysql.createConnection(config);
        console.log('Connected to database');

        // Update Category table
        console.log('Updating Category status...');
        await connection.query(`
            UPDATE Category 
            SET Status = CASE
                WHEN Status IN ('T', '1', 'true', 'Active', 'Y') OR Status IS NULL THEN 'active'
                ELSE 'inactive'
            END
        `);

        // Update SubCategory table
        console.log('Updating SubCategory status...');
        await connection.query(`
            UPDATE SubCategory 
            SET Status = CASE
                WHEN Status IN ('1', 'true', 'T', 'Active', 'Y') OR Status IS NULL THEN 'active'
                ELSE 'inactive'
            END
        `);

        // Update Product table
        console.log('Updating Product status...');
        await connection.query(`
            UPDATE Product 
            SET Status = CASE
                WHEN Status IN ('1', 'true', 'T', 'Active', 'Y') OR Status IS NULL THEN 'active'
                ELSE 'inactive'
            END
        `);

        // Update UserLogin table
        console.log('Updating UserLogin status...');
        await connection.query(`
            UPDATE UserLogin 
            SET Status = CASE
                WHEN Status IN ('1', 'true', 'T', 'Active', 'Y') OR Status IS NULL THEN 'active'
                ELSE 'inactive'
            END
        `);

        // Update ContactUs table
        console.log('Updating ContactUs status...');
        await connection.query(`
            UPDATE ContactUs 
            SET Status = CASE
                WHEN Status IN ('1', 'true', 'T', 'Active', 'Y') OR Status IS NULL THEN 'active'
                ELSE 'inactive'
            END
        `);

        console.log('All status values updated successfully!');
        await connection.end();

    } catch (error) {
        console.error('Error updating status values:', error);
        if (error.sqlMessage) {
            console.error('SQL Error:', error.sqlMessage);
        }
        process.exit(1);
    }
}

updateStatus(); 