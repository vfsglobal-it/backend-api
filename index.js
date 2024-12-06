const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage
const dataStore = [];

// GET endpoint
app.get('/api/data', (req, res) => {
    res.status(200).json({
        message: "Here is the data",
        data: dataStore,
    });
});

// POST endpoint
app.post('/api/data', (req, res) => {
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
