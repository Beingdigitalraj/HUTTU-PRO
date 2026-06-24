function startBot() {
    const apiKey = document.getElementById('apiKey').value;
    const apiSecret = document.getElementById('apiSecret').value;

    if (apiKey === "" || apiSecret === "") {
        alert("Please enter both API Key and Secret!");
        return;
    }

    console.log("Bot starting with Key:", apiKey);
    alert("Bot initiated successfully for: " + apiKey);
    // Yahan aage ka logic aayega (API connection)
}
