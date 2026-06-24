const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Cloud Run ke liye port configuration
const PORT = process.env.PORT || 8080;

// Security Middleware
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/v1/status', (req, res) => {
    res.json({ 
        success: true, 
        message: "HUTTU PRO Engine: Bot is active and secure!" 
    });
});

// Health Check Route (Root)
app.get('/', (req, res) => {
    res.status(200).send("HUTTU PRO Engine is online and running smoothly!");
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong on the server!" });
});

// Server Start (0.0.0.0 zaroori hai Cloud Run ke liye)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ HUTTU PRO Server running on port ${PORT}`);
});
