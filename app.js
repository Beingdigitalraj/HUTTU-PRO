// 🛡️ HUTTU PRO - Secure Backend & Multi-Signal Integration
let userWalletAddress = null;
let isAcceptedMember = false;

// 1. Safe Wallet Connection (Existing)
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
        } catch (error) {
            alert("Security Log: Connection request aborted.");
        }
    } else {
        alert("Security Alert: Use MetaMask.");
    }
}

// 2. NEW: 3-Panel Signal Integration (यह फंक्शन तीनों पैनल के डेटा को एक साथ दिखाएगा)
function updateSignalBoard(signalData) {
    // मान लीजिए signalData में {panel1, panel2, panel3} हैं
    document.getElementById('signalDisplay1').innerText = signalData.panel1;
    document.getElementById('signalDisplay2').innerText = signalData.panel2;
    document.getElementById('signalDisplay3').innerText = signalData.panel3;
    
    console.log("Signals Updated for all panels");
}

// 3. Helper Functions (Existing)
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