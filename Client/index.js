const messages = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');
const submitButton = document.getElementById('submit');

const URL = 'ws://localhost:8080/websocket';
const server = new WebSocket(URL);

submitButton.disabled = true;

const generateMessageEntry = (name, message) => {
    let newMessage = document.createElement('div');
    newMessage.textContent = `${name} : ${message}`;
    messages.appendChild(newMessage);
}

const sendMessage = () => {
    const text = inputMessage.value.trim();
    if (text === "") return;
    // generateMessageEntry('Client', text)
    inputMessage.value = "";
    server.send(JSON.stringify({
        type: 'message',
        payload: {
            message: text
        }
    }));
};

server.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === 'message') {
        const message = data.payload.message;
        generateMessageEntry('Server', message);
    }
};

submitButton.addEventListener('click', sendMessage);
inputMessage.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

server.onopen = () => {
    submitButton.disabled = false;
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('roomId');

    server.send(JSON.stringify({
        type: 'join',
        payload: {
            roomId: roomId
        }
    }))
};

server.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

server.onclose = (event) => {
    console.log('WebSocket closed:', event);
    submitButton.disabled = true;
};