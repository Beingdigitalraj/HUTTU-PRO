const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Cloud Run के लिए पोर्ट कॉन्फ़िगरेशन (यह 8080 को प्राथमिकता देता है)
const PORT = process.env.PORT || 8080;

// Security Middleware (सुरक्षा के लिए)
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// API Status Route
app.post('/api/v1/status', (req, res) => {
    res.json({ 
        success: true, 
        message: "HUTTU PRO Engine: Bot is active and secure!" 
    });
});

// Health Check Route (Cloud Run इसे ही चेक करता है)
app.get('/', (req, res) => {
    res.status(200).send("HUTTU PRO Engine is online and running smoothly!");
});

// Error Handling (एरर को मैनेज करने के लिए)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong on the server!" });
});

// Server Start (0.0.0.0 का उपयोग Cloud Run के लिए अनिवार्य है)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ HUTTU PRO Server running on port ${PORT}`);
});
