const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Global Signal State
let latestSignals = { p1: "WAIT", p2: "WAIT", p3: "WAIT" };

// 1. Health Check
app.get('/', (req, res) => {
    res.status(200).json({ message: "HUTTU PRO Engine is online!" });
});

// 2. Signal Update Endpoint (For Telegram Bot)
app.post('/api/v1/update-signals', (req, res) => {
    latestSignals = req.body; 
    console.log("Signals updated:", latestSignals);
    res.status(200).json({ status: "success", message: "Signals updated" });
});

// 3. Get Signals Endpoint (For Web Dashboard)
app.get('/api/v1/get-signals', (req, res) => {
    res.status(200).json(latestSignals);
});

// 4. Deposit Endpoint
app.post('/api/v1/deposit', async (req, res) => {
    const { userId, amount, currency } = req.body;
    console.log(`Processing deposit: ${amount} ${currency} for ${userId}`);
    res.status(200).json({ status: "success", message: "Deposit received" });
});

// 5. Withdraw Endpoint
app.post('/api/v1/withdraw', async (req, res) => {
    res.status(200).json({ status: "success", message: "Withdrawal initiated" });
});

// 6. Futures Trading Engine
app.post('/api/v1/trade/futures', async (req, res) => {
    const { symbol, side, amount, leverage } = req.body;
    res.status(200).json({ status: "success", message: `Trade executed for ${symbol}` });
});

// Server Init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Huttu Pro engine running on port ${PORT}`);
});
