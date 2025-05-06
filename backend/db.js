const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.DB_HOST || 'srv1401.hstgr.io',
    user: process.env.DB_USER || 'u633565616_vvdesign',
    password: process.env.DB_PASSWORD || 'Vibha_DS01',
    database: process.env.DB_NAME || 'u633565616_vvdesign',
    ssl: { rejectUnauthorized: false },
    multipleStatements: true
};

let pool;

async function getPool() {
    if (!pool) {
        pool = mysql.createPool(config);
    }
    return pool;
}

async function executeQuery(query, params = []) {
    const pool = await getPool();
    const [rows] = await pool.execute(query, params);
    return rows;
}

async function executeStoredProcedure(procName, params = []) {
    const pool = await getPool();
    // Build the CALL statement with the correct number of ?
    const placeholders = params.map(() => '?').join(', ');
    const sql = `CALL ${procName}(${placeholders})`;
    const [rows] = await pool.query(sql, params);
    // MySQL stored procedures return results as [ [rows], ... ]
    return Array.isArray(rows) ? rows[0] || rows : rows;
}

module.exports = {
    executeQuery,
    executeStoredProcedure,
    getPool
}; 