// 🛡️ HUTTU PRO - Secure Backend Integration (Updated)
let userWalletAddress = null;
let isAcceptedMember = false;

// 1. Safe Wallet Connection
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userWalletAddress = accounts[0];
            
            const shortAddress = userWalletAddress.substring(0, 6) + "..." + userWalletAddress.substring(userWalletAddress.length - 4);
            document.getElementById('walletBtn').innerText = "Secured: " + shortAddress;
            document.getElementById('walletBtn').style.backgroundColor = "#2ebd85";
            
            // रेफरल लिंक सेटअप
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

// 2. Safe Helper Functions (No API Keys Used)
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
