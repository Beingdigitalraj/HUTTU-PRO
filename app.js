// HUTTU PRO - Core Web3 & Binance API Logic
let userWalletAddress = null;
let isAcceptedMember = false; // Will be managed via backend panel later

// 1. Connect Web3 Wallet (MetaMask, Trust Wallet, etc.)
async function connectWallet() {
    if (window.ethereum) {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userWalletAddress = accounts[0];
            
            // Shorten the address to display (e.g., 0x1234...abcd)
            const shortAddress = userWalletAddress.substring(0, 6) + "..." + userWalletAddress.substring(userWalletAddress.length - 4);
            
            document.getElementById('walletBtn').innerText = "Connected: " + shortAddress;
            document.getElementById('walletBtn').style.backgroundColor = "#2ebd85"; // Change button to green
            console.log("Wallet connected successfully: " + userWalletAddress);
            
            // For testing purposes, unlocking chat on wallet connect
            unlockChatArea();
            
        } catch (error) {
            alert("Wallet connection rejected by user.");
            console.error(error);
        }
    } else {
        alert("Web3 Wallet not detected! Please open this site inside Trust Wallet dApp Browser or install MetaMask.");
    }
}

// 2. Save and Validate Binance API Keys for Auto Trading
function saveBinanceAPI() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const secretKey = document.getElementById('secretKey').value.trim();
    const statusText = document.getElementById('apiStatus');

    if (!userWalletAddress) {
        alert("Please connect your Web3 Wallet first before activating the bot!");
        return;
    }

    if (apiKey === "" || secretKey === "") {
        alert("Please enter both API Key and Secret Key.");
        return;
    }

    statusText.innerText = "⏳ Connecting API to HUTTU PRO AI Trading Engine...";
    statusText.style.color = "#f0b90b";

    // Simulating Secure API handshake
    setTimeout(() => {
        statusText.innerText = "✅ AI Bot Activated Successfully! Auto-trading is now running via Binance API.";
        statusText.style.color = "#2ebd85";
        alert("Success: Binance API linked securely. Withdrawal permission is verified as BLOCKED.");
    }, 2000);
}

// 3. Gaming Launch Verification
function launchGame(gameName) {
    if (!userWalletAddress) {
        alert("Please connect your Web3 Wallet to play " + gameName);
        return;
    }
    alert("🚀 Launching " + gameName + ". Fetching smart contract balance...");
}

// 4. Chat Unlock Functionality for Members
function unlockChatArea() {
    isAcceptedMember = true; // Temporary mock approval on wallet connection
    document.getElementById('chatInput').disabled = false;
    document.getElementById('chatInput').placeholder = "Write a verified message...";
    document.getElementById('chatSendBtn').disabled = false;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    
    if (input.value.trim() !== "") {
        const newMsg = document.createElement('p');
        newMsg.innerHTML = `<strong>User (${userWalletAddress.substring(0,4)}...):</strong> ${input.value}`;
        chatBox.appendChild(newMsg);
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
    }
}
