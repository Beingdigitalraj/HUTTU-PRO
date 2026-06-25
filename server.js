const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Security and Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Global variable to store latest signals
let latestSignals = { p1: "WAIT", p2: "WAIT", p3: "WAIT" };

// 1. Basic Health Check
app.get('/', (req, res) => {
    res.status(200).json({ message: "HUTTU PRO Engine is online and running smoothly!" });
});

// 2. Deposit Endpoint
app.post('/api/v1/deposit', async (req, res) => {
    try {
        const { userId, amount, currency } = req.body;
        console.log(`Processing deposit for ${userId}: ${amount} ${currency}`);
        res.status(200).json({ status: "success", message: "Deposit request received" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// 3. Withdraw Endpoint
app.post('/api/v1/withdraw', async (req, res) => {
    try {
        const { userId, amount } = req.body;
        res.status(200).json({ status: "success", message: "Withdrawal initiated" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// 4. Futures Trading Engine
app.post('/api/v1/trade/futures', async (req, res) => {
    try {
        const { symbol, side, amount, leverage } = req.body;
        res.status(200).json({ status: "success", message: `Trade executed for ${symbol} at ${leverage}x` });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// 5. Telegram Bot से सिग्नल लेने के लिए (POST)
app.post('/api/v1/update-signals', (req, res) => {
    latestSignals = req.body; 
    console.log("Signals updated:", latestSignals);
    res.status(200).json({ status: "success", message: "Signals updated" });
});

// 6. वेब डैशबोर्ड को सिग्नल भेजने के लिए (GET)
app.get('/api/v1/get-signals', (req, res) => {
    res.status(200).json(latestSignals);
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Huttu Pro engine running on port ${PORT}`);
});
