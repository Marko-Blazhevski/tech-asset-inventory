const express = require('express');
const cors = require('cors');
const db = require('./db');
const {query} = require("./db");
const app = express();
const port = 5050;

// --- Middleware ---
app.use(cors());

// --- BodyParser ---
app.use(express.json());

// --- API routes ---
app.get('/api', (req, res) => {
    console.log("Request received at /api!"); // <--- Add this
    const message = 'hello world';
    return res.status(200).json(message);
});

app.get('/api/users', async (req, res) => {
    const result = await db.query('SELECT * FROM users');
    return res.status(200).json({ data: result });
});

app.post('/api/users', async (req, res) => {
    const {user} = req.body;
    const queryText = 'INSERT INTO users(id, name) VALUES($1, $2) RETURNING *';
    const values = [user.id, user.name];
    const result = await query(queryText, values);
    return res.status(201).json({
        message: "user created successfully",
        data: result
    });
});

// --- The Startup Logic ---
const startApp = async () => {
    let connected = false;

    while (!connected) {
        try {
            // 1. Try to ping the DB
            await db.query('SELECT 1');

            // 2. Once awake, initialize the table
            await db.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id VARCHAR PRIMARY KEY, 
                    name VARCHAR(100)
                )
            `);

            console.log("✅ Database is ready. Table 'users' verified.");
            connected = true;
        } catch (err) {
            console.log("🟡 Database is still booting up... retrying in 3s");
            // Wait 3 seconds before the next loop iteration
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

    // 3. Only listen AFTER the DB is ready
    app.listen(port, () => {
        console.log(`🚀 Employees Express App running on port ${port}`);
    });
};

startApp();