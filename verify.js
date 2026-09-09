async function registerKeyOnServer(generatedKey) {
    try {
        const response = await fetch('https://your-server-url.com/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                key: generatedKey,
                adminPass: "Supermarket"
            })
        });
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error("Failed to sync key with server:", error);
    }
}
