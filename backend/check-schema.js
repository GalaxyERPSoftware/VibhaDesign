const mssql = require('mssql');

const config = {
    user: 'galaxy',
    password: 'jaigurudev',
    database: 'VibhaDesignStudio',
    server: 'gi12',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function checkSchema() {
    try {
        await mssql.connect(config);
        console.log('Connected to database');
        
        // Check ProductMst columns
        console.log('\nProductMst columns:');
        const productColumns = await mssql.query`
            SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'ProductMst'
            ORDER BY ORDINAL_POSITION;
        `;
        console.log(productColumns.recordset);

        // Check UserLogin columns
        console.log('\nUserLogin columns:');
        const userColumns = await mssql.query`
            SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'UserLogin'
            ORDER BY ORDINAL_POSITION;
        `;
        console.log(userColumns.recordset);

        // Check ContactMst columns
        console.log('\nContactMst columns:');
        const contactColumns = await mssql.query`
            SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'ContactMst'
            ORDER BY ORDINAL_POSITION;
        `;
        console.log(contactColumns.recordset);
        
    } catch (err) {
        console.error('Error:', err);
        if (err.originalError) {
            console.error('Original error:', err.originalError);
        }
    } finally {
        await mssql.close();
    }
}

checkSchema(); 