const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    server: process.env.DB_HOST || '89.116.133.94',
    database: process.env.DB_NAME || 'u633565616_vvdesign',
    user: process.env.DB_USER || 'galaxy',
    password: process.env.DB_PASSWORD || 'jaigurudev',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        instanceName: 'gi12'
    },
    pool: {
        max: 50,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

console.log('Database configuration:', {
    server: config.server,
    database: config.database,
    user: config.user,
    options: config.options
    // Don't log password
});

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.error('SQL Pool Error:', err);
});

async function executeQuery(query, params = [], retries = 5) {
    await poolConnect;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const request = pool.request();
            
            // Add parameters to the request
            if (params && params.length > 0) {
                params.forEach((param, index) => {
                    request.input(`param${index}`, param);
                });
            }
            
            const result = await request.query(query);
            return result.recordset;
        } catch (err) {
            console.error(`Attempt ${attempt} - Error executing query:`, {
                error: err.message,
                code: err.code,
                state: err.state
            });
            
            if (attempt === retries || !isRetryableError(err)) {
                throw err;
            }
            
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

async function executeStoredProcedure(procName, params = [], retries = 5) {
    await poolConnect;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const request = pool.request();
            
            // Add parameters to the request
            if (params && params.length > 0) {
                params.forEach((param, index) => {
                    request.input(`param${index}`, param);
                });
            }
            
            console.log('Executing stored procedure:', { procName, params });
            const result = await request.execute(procName);
            return result.recordset;
        } catch (err) {
            console.error(`Attempt ${attempt} - Error executing stored procedure:`, {
                procedure: procName,
                error: err.message,
                code: err.code,
                state: err.state
            });
            
            if (attempt === retries || !isRetryableError(err)) {
                throw err;
            }
            
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

function isRetryableError(err) {
    const retryableCodes = [
        'ETIMEOUT',
        'ECONNRESET',
        'EPIPE',
        'PROTOCOL_CONNECTION_LOST'
    ];
    return retryableCodes.includes(err.code);
}

async function testConnection(retries = 5) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await poolConnect;
            console.log('✅ Connected to MSSQL database!');
            return true;
        } catch (err) {
            console.error(`Attempt ${attempt} - Database Connection Failed:`, {
                error: err.message,
                code: err.code,
                state: err.state
            });
            
            if (attempt === retries || !isRetryableError(err)) {
                return false;
            }
            
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    return false;
}

// Initial connection test
testConnection().then(success => {
    if (!success) {
        console.error('Failed to establish initial database connection');
        process.exit(1);
    }
});

module.exports = {
    executeQuery,
    executeStoredProcedure,
    pool
}; 