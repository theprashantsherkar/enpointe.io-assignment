
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "Prashu@8484",
    database: 'bank',
    port: 3306,
});

const db = pool.promise();

db.query('SELECT 1')
    .then(() => console.log('MySQL connected successfully'.bgMagenta.black))
    .catch((err) => console.error('MySQL connection failed:', err.message));


export default db;