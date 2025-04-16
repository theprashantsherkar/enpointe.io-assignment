
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'interchange.proxy.rlwy.net',
    user: "root",
    password: "flQCafaHYPORXkiOVGXIwaLywXGOdmTN",
    database: 'railway',
    port: 51640,
});

const db = pool.promise();

const usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    userRole ENUM('customer', 'banker') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const accountsQuery = `CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    transaction_type ENUM('deposit', 'withdraw') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    transaction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)`;

db.query(usersTableQuery)
    .then(() => console.log('Users table created successfully'.bgCyan.black.bold))
    .catch((err) => console.error('Error creating users table:', err.message));

db.query(accountsQuery)
    .then(() => console.log('Accounts table created successfully'.bgCyan.black.bold))
    .catch((err) => console.error('Error creating accounts table:', err.message));


db.query('SELECT 1')
    .then(() => console.log('MySQL connected successfully'.bgMagenta.black))
    .catch((err) => console.error('MySQL connection failed:', err.message));


export default db;