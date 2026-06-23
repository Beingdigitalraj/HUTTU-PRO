// 🛡️ HUTTU PRO - Secure Backend Integration
let userWalletAddress = null;
let isAcceptedMember = false;
let lastMessageTime = 0;

// 1. Safe Wallet Connection
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userWalletAddress = accounts[0];
            
            const shortAddress = userWalletAddress.substring(0, 6) + "..." + userWalletAddress.substring(userWalletAddress.length - 4);
            document.getElementById('walletBtn').innerText = "Secured: " + shortAddress;
            document.getElementById('walletBtn').style.backgroundColor = "#2ebd85";
            
            if(document.getElementById('referralLinkInput')) {
                document.getElementById('referralLinkInput').value = `https://beingdigitalraj.github.io/HUTTU-PRO/?ref=${userWalletAddress}`;
            }
            unlockChatArea();
            console.log("Wallet Connected:", userWalletAddress);
        } catch (error) {
            alert("Security Log: Connection request aborted.");
        }
    } else {
        alert("Security Alert: Use Kiwi Browser/Mises Browser with MetaMask extension installed.");
    }
}

// 2. Secure Multi-Exchange API Call
async function saveExchangeAPI() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const secretKey = document.getElementById('secretKey').value.trim();
    const statusText = document.getElementById('apiStatus');

    if (!userWalletAddress) { alert("Access Denied: Connect Wallet First!"); return; }
    if (apiKey === "" || secretKey === "") { alert("Notice: API fields cannot be empty."); return; }

    statusText.innerText = `⏳ Initializing secure server handshake...`;
    statusText.style.color = "#f0b90b";

    try {
        // यहाँ 'http://localhost:5000' की जगह अपना Railway.app का लाइव लिंक डालें
        const response = await fetch('YOUR_RAILWAY_LIVE_URL/api/v1/binance/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey, secretKey, action: "BOT_START", amount: "0.01" })
        });
        
        const result = await response.json();
        if (result.success) {
            statusText.innerText = `✅ Success: ${result.message}`;
            statusText.style.color = "#2ebd85";
        } else {
            statusText.innerText = `🚨 Error: ${result.error}`;
            statusText.style.color = "#f6465d";
        }
    } catch (err) {
        alert("🚨 Connection Failed! Ensure your Backend Server is running.");
        statusText.innerText = "Failed to connect to backend.";
    }
}

// 3. Helpers
function copyReferralLink() {
    const copyText = document.getElementById("referralLinkInput");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("🚀 Promotion Link Copied!");
}

function unlockChatArea() {
    isAcceptedMember = true;
    document.getElementById('chatInput').disabled = false;
    document.getElementById('chatSendBtn').disabled = false;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    if (input.value.trim() !== "") {
        const newMsg = document.createElement('p');
        newMsg.innerHTML = `<strong>User:</strong> ${input.value}`;
        chatBox.appendChild(newMsg);
        input.value = "";
    }
}
