import sql from 'mssql';

const config = {
    user: 'galaxy',
    password: 'jaigurudev',
    server: 'TINA',
    database: 'vibha',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
    
};

sql.connect(config)
    .then(() => {
        console.log('✅ Connected to MSSQL database!');
    })
    .catch(err => {
        console.error(' Database connection failed:', err);
    });

export default sql;
