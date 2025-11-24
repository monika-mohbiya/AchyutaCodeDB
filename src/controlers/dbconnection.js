import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,   // default MySQL port
    waitForConnections: true,
    connectionLimit: 10,   // maximum simultaneous connections
    queueLimit: 0
});

// Optional: Promise wrapper for async/await queries
const db = pool.promise();

db.getConnection()
    .then(conn => {
        console.log('✅ Connected to MySQL pool!');
        conn.release(); // release connection back to pool
    })
    .catch(err => {
        console.error('❌ DB connection failed:', err.message);
    });

export default db;
