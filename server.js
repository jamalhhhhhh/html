const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// In-memory database storage (Replace with MongoDB, SQLite, or Firebase for permanent storage)
const databaseKeys = new Set();

// Endpoint for your admin panel to register newly generated keys
app.post('/api/generate', (req, res) => {
    const { key, adminPass } = req.body;

    if (adminPass !== "Supermarket") {
        return res.status(401).json({ success: false, message: "Unauthorized admin access." });
    }

    if (key) {
        databaseKeys.add(key.trim().toUpperCase());
        console.log(`Key generated & stored: ${key}`);
        return res.json({ success: true, message: "Key saved to server database." });
    }

    res.status(400).json({ success: false, message: "Missing key data." });
});

// Endpoint for your BepInEx C# game mod to verify keys
app.get('/api/verify', (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.json({ valid: false, message: "No key provided." });
    }

    const cleanKey = key.trim().toUpperCase();

    if (databaseKeys.has(cleanKey)) {
        return res.json({ valid: true, message: "License verified successfully." });
    } else {
        return res.json({ valid: false, message: "Key not found or expired." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`License server running on port ${PORT}`);
});
