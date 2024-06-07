const messages = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');
const submitButton = document.getElementById('submit');

const URL = 'ws://localhost:8080/websocket';
const server = new WebSocket(URL);

submitButton.disabled = true;

const sendMessage = () => {
    const text = inputMessage.value.trim();
    if (text === "") return;

    inputMessage.value = "";
    let newMessage = document.createElement('div');
    newMessage.textContent = `Client: ${text}`;
    messages.appendChild(newMessage);
    server.send(text);
};

server.onmessage = (event) => {
    const { data } = event;
    const newServerMessage = document.createElement('div');
    newServerMessage.textContent = `Server: ${data}`;
    messages.appendChild(newServerMessage);
};

submitButton.addEventListener('click', sendMessage);
inputMessage.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

server.onopen = () => {
    submitButton.disabled = false;
};

server.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

server.onclose = (event) => {
    console.log('WebSocket closed:', event);
    submitButton.disabled = true;
};