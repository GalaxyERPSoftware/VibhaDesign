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

        // 1. List all tables
        const tables = await mssql.query`
            SELECT TABLE_SCHEMA, TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_TYPE = 'BASE TABLE'
            ORDER BY TABLE_SCHEMA, TABLE_NAME;
        `;
        console.log('\nTables:');
        tables.recordset.forEach(t => console.log(`- ${t.TABLE_SCHEMA}.${t.TABLE_NAME}`));

        // 2. List all columns for each table
        for (const t of tables.recordset) {
            const columns = await mssql.query`
                SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE, IS_NULLABLE
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = ${t.TABLE_SCHEMA} AND TABLE_NAME = ${t.TABLE_NAME}
                ORDER BY ORDINAL_POSITION;
            `;
            console.log(`\nColumns in ${t.TABLE_SCHEMA}.${t.TABLE_NAME}:`);
            columns.recordset.forEach(col => {
                console.log(`- ${col.COLUMN_NAME} (${col.DATA_TYPE}${col.CHARACTER_MAXIMUM_LENGTH ? `(${col.CHARACTER_MAXIMUM_LENGTH})` : ''}${col.NUMERIC_PRECISION ? `(${col.NUMERIC_PRECISION}${col.NUMERIC_SCALE ? ',' + col.NUMERIC_SCALE : ''})` : ''}, Nullable: ${col.IS_NULLABLE})`);
            });
        }

        // 3. List all primary and foreign keys
        const pk = await mssql.query`
            SELECT tc.TABLE_SCHEMA, tc.TABLE_NAME, kcu.COLUMN_NAME
            FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
            JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
                ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
            WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY';
        `;
        console.log('\nPrimary Keys:');
        pk.recordset.forEach(row => console.log(`${row.TABLE_SCHEMA}.${row.TABLE_NAME}: ${row.COLUMN_NAME}`));

        const fk = await mssql.query`
            SELECT fk.name AS FK_Name, tp.name AS ParentTable, ref.name AS ReferencedTable
            FROM sys.foreign_keys fk
            INNER JOIN sys.tables tp ON fk.parent_object_id = tp.object_id
            INNER JOIN sys.tables ref ON fk.referenced_object_id = ref.object_id;
        `;
        console.log('\nForeign Keys:');
        fk.recordset.forEach(row => console.log(`${row.FK_Name}: ${row.ParentTable} -> ${row.ReferencedTable}`));

        // 4. List all views and their definitions
        const views = await mssql.query`
            SELECT TABLE_SCHEMA, TABLE_NAME, VIEW_DEFINITION
            FROM INFORMATION_SCHEMA.VIEWS;
        `;
        console.log('\nViews:');
        views.recordset.forEach(v => console.log(`- ${v.TABLE_SCHEMA}.${v.TABLE_NAME}:\n${v.VIEW_DEFINITION}\n`));

        // 5. List all stored procedures and their definitions
        const procs = await mssql.query`
            SELECT SPECIFIC_SCHEMA, SPECIFIC_NAME, ROUTINE_DEFINITION
            FROM INFORMATION_SCHEMA.ROUTINES
            WHERE ROUTINE_TYPE = 'PROCEDURE';
        `;
        console.log('\nStored Procedures:');
        procs.recordset.forEach(p => console.log(`- ${p.SPECIFIC_SCHEMA}.${p.SPECIFIC_NAME}:\n${p.ROUTINE_DEFINITION}\n`));

        // 6. List all user-defined functions and their definitions
        const funcs = await mssql.query`
            SELECT SPECIFIC_SCHEMA, SPECIFIC_NAME, ROUTINE_DEFINITION
            FROM INFORMATION_SCHEMA.ROUTINES
            WHERE ROUTINE_TYPE = 'FUNCTION';
        `;
        console.log('\nUser-Defined Functions:');
        funcs.recordset.forEach(f => console.log(`- ${f.SPECIFIC_SCHEMA}.${f.SPECIFIC_NAME}:\n${f.ROUTINE_DEFINITION}\n`));

        // 7. List all user-defined data types
        const udts = await mssql.query`
            SELECT name AS TypeName, system_type_id, user_type_id
            FROM sys.types
            WHERE is_user_defined = 1;
        `;
        console.log('\nUser-Defined Data Types:');
        udts.recordset.forEach(t => console.log(`- ${t.TypeName} (system_type_id: ${t.system_type_id}, user_type_id: ${t.user_type_id})`));

        // 8. List all schemas
        const schemas = await mssql.query`
            SELECT schema_id, name AS SchemaName
            FROM sys.schemas;
        `;
        console.log('\nSchemas:');
        schemas.recordset.forEach(s => console.log(`- ${s.schema_id}: ${s.SchemaName}`));

        // 9. Fetch a sample of data from each table (TOP 5 rows)
        for (const t of tables.recordset) {
            const data = await mssql.query(`SELECT TOP 5 * FROM [${t.TABLE_SCHEMA}].[${t.TABLE_NAME}]`);
            console.log(`\nSample data from ${t.TABLE_SCHEMA}.${t.TABLE_NAME}:`);
            console.table(data.recordset);
        }

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