async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value;
    if (userMessage.trim() === '') return;

    addMessageToChat('user-message', userMessage);

    inputField.value = '';
    const botMessage = await getBotResponse(userMessage);
    addMessageToChat('bot-message', botMessage);
}

function addMessageToChat(className, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.innerText = message;
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

async function getBotResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: userMessage }],
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
}
