const sql = require('mssql');

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

async function checkTables() {
    try {
        await sql.connect(config);
        
        // Get all tables
        const tables = await sql.query`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_TYPE = 'BASE TABLE'`;
        
        console.log('Tables found:', tables.recordset.map(t => t.TABLE_NAME));
        
        // Get columns for each table
        for (const table of tables.recordset) {
            const columns = await sql.query`
                SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_NAME = ${table.TABLE_NAME}
                ORDER BY ORDINAL_POSITION`;
            
            console.log(`\nColumns in ${table.TABLE_NAME}:`);
            columns.recordset.forEach(col => {
                console.log(`- ${col.COLUMN_NAME} (${col.DATA_TYPE}${col.CHARACTER_MAXIMUM_LENGTH ? `(${col.CHARACTER_MAXIMUM_LENGTH})` : ''})`);
            });
        }
        
        await sql.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkTables(); 