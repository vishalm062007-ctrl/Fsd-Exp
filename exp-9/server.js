const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend UI

// PostgreSQL Connection Setup
// Make sure you have created the database `employee_db` in your PostgreSQL server.
// Update password or user if it's different on your machine.
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_db',
  password: 'admin', // Change this to your actual pg password
  port: 5432,
});

// Automatically create employees table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(100),
    salary NUMERIC(10, 2)
  );
`;

pool.query(createTableQuery)
  .then(() => console.log('PostgreSQL: Employees table ready'))
  .catch(err => {
      console.error('Error creating table. Ensure database "employee_db" exists.');
      console.error(err.message);
  });

// --- CRUD Routes ---

// 1. Create an Employee (C)
app.post('/api/employees', async (req, res) => {
    const { name, email, department, salary } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO employees (name, email, department, salary) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, department, salary]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. Read all Employees (R)
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Read a specific Employee by ID
app.get('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update an Employee (U)
app.put('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, department, salary } = req.body;
    try {
        const result = await pool.query(
            'UPDATE employees SET name = $1, email = $2, department = $3, salary = $4 WHERE id = $5 RETURNING *',
            [name, email, department, salary, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 5. Delete an Employee (D)
app.delete('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully', employee: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
