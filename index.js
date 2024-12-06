const express = require('express');
const pool = require('./db');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage
const dataStore = [];

// POST endpoint to save an item to the database
app.post('/api/data', async (req, res) => {
const { item } = req.body;

if (!item) {
    return res.status(400).json({ error: 'Item is required' });
}

try {
    const result = await pool.query(
    'INSERT INTO items (name) VALUES ($1) RETURNING *',
    [item]
    );
    res.status(201).json({ message: 'Item saved successfully', data: result.rows[0] });
} catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});
  
// GET endpoint to retrieve all items
app.get('/api/data', async (req, res) => {
try {
    const result = await pool.query('SELECT * FROM items');
    res.status(200).json(result.rows);
} catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});
  
// GET endpoint
/*app.get('/api/data', (req, res) => {
    res.status(200).json({
        message: "Here is the data",
        data: dataStore,
    });
});
*/
// POST endpoint
/*app.post('/api/data', (req, res) => {
    const { item } = req.body;

    if (!item) {
        return res.status(400).json({ error: "Missing 'item' in request body" });
    }

    dataStore.push(item);
    res.status(201).json({
        message: "Item added successfully",
        data: item,
    });
});
*/

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
