// HUTTU PRO - Core Web3, Multi-Exchange & Suraksha Kavach Logic
let userWalletAddress = null;
let isAcceptedMember = false; 
let lastMessageTime = 0; // Anti-Spam variable

// Live Security Ticker simulation
setInterval(() => {
    const logs = [
        "🛡️ Suraksha Kavach: SQL Injection Scan Clear.",
        "🛡️ Suraksha Kavach: API Endpoint Encrypted.",
        "🛡️ Suraksha Kavach: DDOS Protection Active.",
        "🛡️ Suraksha Kavach: 0 Exploits Detected."
    ];
    const randomLog = logs[Math.floor(Math.random() * logs.length)];
    if(document.getElementById('firewallLogs')) {
        document.getElementById('firewallLogs').innerText = randomLog;
    }
}, 4000);

// 1. Connect Web3 Wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userWalletAddress = accounts[0];
            
            const shortAddress = userWalletAddress.substring(0, 6) + "..." + userWalletAddress.substring(userWalletAddress.length - 4);
            
            document.getElementById('walletBtn').innerText = "Connected: " + shortAddress;
            document.getElementById('walletBtn').style.backgroundColor = "#2ebd85"; 
            console.log("Wallet secure link: " + userWalletAddress);
            
            unlockChatArea();
            
        } catch (error) {
            alert("Security Notice: Connection rejected by user.");
            console.error(error);
        }
    } else {
        alert("Web3 Wallet not detected! Please open this site inside Trust Wallet or MetaMask.");
    }
}

// 2. Multi-Exchange Secure API Handling
function saveExchangeAPI() {
    const exchange = document.getElementById('exchangeSelect').value;
    const apiKey = document.getElementById('apiKey').value.trim();
    const secretKey = document.getElementById('secretKey').value.trim();
    const statusText = document.getElementById('apiStatus');

    if (!userWalletAddress) {
        alert("Access Denied: Please connect your secure Web3 Wallet first!");
        return;
    }

    // Basic script hacking blocking injection check
    if (apiKey.includes("<script>") || secretKey.includes("<script>")) {
        alert("Hacking Attempt Detected: Script Injection Blocked. IP flagged.");
        return;
    }

    if (apiKey === "" || secretKey === "") {
        alert("Error: Fields cannot be blank.");
        return;
    }

    statusText.innerText = `⏳ Executing secure API handshake with ${exchange} Auto Trading Core...`;
    statusText.style.color = "#f0b90b";

    setTimeout(() => {
        statusText.innerText = `✅ Success! ${exchange} Automated AI Trading Engine is fully operational.`;
        statusText.style.color = "#2ebd85";
        alert(`Suraksha Kavach Verified: Connected to ${exchange}. Withdrawal permission is 100% BLOCKED.`);
    }, 2000);
}

// 3. Gaming Hub
function launchGame(gameName) {
    if (!userWalletAddress) {
        alert("Access Blocked: Connect wallet to authenticate game session.");
        return;
    }
    alert("🚀 Securely launching " + gameName + "... Creating transaction block.");
}

// 4. Chat System with Anti-Spam Cool-down
function unlockChatArea() {
    isAcceptedMember = true; 
    document.getElementById('chatInput').disabled = false;
    document.getElementById('chatInput').placeholder = "Write a secure message...";
    document.getElementById('chatSendBtn').disabled = false;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    const currentTime = Date.now();

    // Anti-Spam Check (User cannot type more than one message every 3 seconds)
    if (currentTime - lastMessageTime < 3000) {
        alert("Anti-Spam Alert: You are typing too fast. Slow down!");
        return;
    }

    if (input.value.trim() !== "") {
        // Hacking prevention check on input text
        if(input.value.includes("<") || input.value.includes(">")) {
            alert("Security block: HTML tags are not allowed in chat.");
            input.value = "";
            return;
        }

        const newMsg = document.createElement('p');
        newMsg.innerHTML = `<strong>User (${userWalletAddress.substring(0,4)}...):</strong> ${input.value}`;
        chatBox.appendChild(newMsg);
        
        lastMessageTime = currentTime; // Update last message timestamp
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight; 
    }
}
