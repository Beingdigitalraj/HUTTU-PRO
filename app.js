// 🛡️ HUTTU PRO - Secure Backend & Signal Handler
let userWalletAddress = null;

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userWalletAddress = accounts[0];
            document.getElementById('walletBtn').innerText = "Connected: " + userWalletAddress.substring(0, 6) + "...";
            document.getElementById('walletBtn').style.backgroundColor = "#2ebd85";
        } catch (error) {
            alert("Connection aborted.");
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// यह फंक्शन आपके सिग्नल को तीनों पैनल में भेजेगा
function updateSignals(sig1, sig2, sig3) {
    document.getElementById('signalDisplay1').innerText = sig1;
    document.getElementById('signalDisplay2').innerText = sig2;
    document.getElementById('signalDisplay3').innerText = sig3;
}

// टेस्ट के लिए: जैसे ही सिग्नल आए, यहाँ से कॉल करें
// updateSignals("BUY", "WAIT", "SELL");