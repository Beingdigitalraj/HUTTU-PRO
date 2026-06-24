const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // सुरक्षा के लिए अतिरिक्त लेयर
require('dotenv').config();

const app = express();

// Google Cloud Run पोर्ट को डायनामिक तरीके से लेता है, इसलिए यहाँ बदलाव किया गया है
const PORT = process.env.PORT || 8080;

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

// बेसिक स्वास्थ्य जांच (Health Check) रूट - Cloud Run को इसकी जरूरत होती है
app.get('/', (req, res) => {
    res.send("HUTTU PRO Engine is online!");
});

// एरर हैंडलिंग
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
