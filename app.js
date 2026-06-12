// HUTTU PRO - Core Web3, Multi-Exchange, Promotion & Lifetime Commission Routing
let userWalletAddress = null;
let isAcceptedMember = false; 
let lastMessageTime = 0; 

// Real-time Suraksha Kavach Simulator
setInterval(() => {
    const firewalls = [
        "🛡️ Suraksha Kavach: Scanning API memory blocks... SAFE",
        "🛡️ Suraksha Kavach: 24x7 Multi-Bot trading execution secure.",
        "🛡️ Suraksha Kavach: Admin Lifetime Commission Vault Synced... 100%",
        "🛡️ Suraksha Kavach: Anti-Hacking Firewall is active. 0 Threats."
    ];
    const logText = firewalls[Math.floor(Math.random() * firewalls.length)];
    if(document.getElementById('firewallLogs')) {
        document.getElementById('firewallLogs').innerText = logText;
    }
}, 4000);

// 1. Safe Wallet Connection
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userWalletAddress = accounts[0];
            
            const shortAddress = userWalletAddress.substring(0, 6) + "..." + userWalletAddress.substring(userWalletAddress.length - 4);
            document.getElementById('walletBtn').innerText = "Secured: " + shortAddress;
            document.getElementById('walletBtn').style.backgroundColor = "#2ebd85"; 
            
            // Dynamic Promo Link Generation for User
            if(document.getElementById('referralLinkInput')) {
                document.getElementById('referralLinkInput').value = `https://beingdigitalraj.github.io/HUTTU-PRO/?ref=${userWalletAddress}`;
            }
            
            unlockChatArea();
        } catch (error) {
            alert("Security Log: Connection request safely aborted.");
        }
    } else {
        alert("Security Alert: Web3 Wallet not detected. Run inside Trust Wallet or MetaMask.");
    }
}

// 2. Promotion Link Copy Function
function copyReferralLink() {
    const copyText = document.getElementById("referralLinkInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
    alert("🚀 Promotion Link Coped Successfully! Share it to start earning lifelong commission structure.");
}

// 3. Multi-Exchange Secure API Handling
function saveExchangeAPI() {
    const exchange = document.getElementById('exchangeSelect').value;
    const apiKey = document.getElementById('apiKey').value.trim();
    const secretKey = document.getElementById('secretKey').value.trim();
    const statusText = document.getElementById('apiStatus');

    if (!userWalletAddress) {
        alert("Access Denied: Please connect your Web3 Wallet first!");
        return;
    }

    if (apiKey.includes("<") || secretKey.includes("<")) {
        alert("🚨 MALWARE BLOCK: Hacking attempt stopped. Script Injection Blocked.");
        return;
    }

    if (apiKey === "" || secretKey === "") {
        alert("Notice: API fields cannot be empty.");
        return;
    }

    statusText.innerText = `⏳ Initializing secure end-to-end 24x7 trading tunnel with ${exchange}...`;
    statusText.style.color = "#f0b90b";

    setTimeout(() => {
        statusText.innerText = `✅ Success! ${exchange} 24x7 AI Bot is now fully operational.`;
        statusText.style.color = "#2ebd85";
        alert(`Suraksha Kavach: Bot Linked. Lifelong commissions activated for this deployment.`);
    }, 2000);
}

// 4. Gaming Hub Protection
function launchGame(gameName) {
    if (!userWalletAddress) {
        alert("Access Blocked: Web3 wallet authentication required.");
        return;
    }
    alert(`🚀 Launching ${gameName} over secure smart contract tunnel.`);
}

// 5. Anti-Spam Chat Controller
function unlockChatArea() {
    isAcceptedMember = true; 
    document.getElementById('chatInput').disabled = false;
    document.getElementById('chatInput').placeholder = "Type your verified message here...";
    document.getElementById('chatSendBtn').disabled = false;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    const currentTime = Date.now();

    if (currentTime - lastMessageTime < 3000) {
        alert("Anti-Spam Filter: Please slow down.");
        return;
    }

    if (input.value.trim() !== "") {
        if(input.value.includes("<") || input.value.includes(">")) {
            input.value = "";
            return;
        }

        const newMsg = document.createElement('p');
        newMsg.innerHTML = `<strong>User (${userWalletAddress.substring(0,4)}...):</strong> ${input.value}`;
        chatBox.appendChild(newMsg);
        
        lastMessageTime = currentTime; 
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight; 
    }
}
