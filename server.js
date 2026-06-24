const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// सुरक्षित रूट: कीज़ मांगना बंद करें
app.post('/api/v1/status', (req, res) => {
    // यहाँ कोई एपीआई की नहीं ली जा रही है
    res.json({ 
        success: true, 
        message: "HUTTU PRO Engine: Bot is active!" 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
