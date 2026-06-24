const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // सुरक्षा के लिए अतिरिक्त लेयर
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// सुरक्षा के लिए Helmet का उपयोग करें
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// रूट: अब यह सुरक्षित है
app.post('/api/v1/status', (req, res) => {
    res.json({ 
        success: true, 
        message: "HUTTU PRO Engine: Bot is active and secure!" 
    });
});

// एरर हैंडलिंग (सुरक्षा के लिए अच्छा है)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
