require('dotenv').config();
const { Pool } = require('pg');

// DEBUG: This will show in your Docker logs so you can see what's being injected
console.log(`Connecting to DB: ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}`);

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Use || 5432 as a fallback in case the env variable is missing
    port: Number(process.env.DB_PORT) || 5432,
    max: Number(process.env.DB_MAX_CONNECTIONS) || 10,
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT) || 3000
});

// Error listener for the pool itself
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};