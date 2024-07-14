// DOM Elements
const messages = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');
const submitButton = document.getElementById('submit');
const roomPopup = document.getElementById('roomPopup');
const enterRoomButton = document.getElementById('enterRoom');
const roomIdInput = document.getElementById('roomId');

// Initialize
submitButton.disabled = true;

// Helper Functions
const generateMessageEntry = (name, message) => {
    let newMessage = document.createElement('div');
    newMessage.textContent = `${name} : ${message}`;
    messages.appendChild(newMessage);
};

const sendMessage = () => {
    const text = inputMessage.value.trim();
    if (text === "") return;
    inputMessage.value = "";
    server.send(JSON.stringify({
        type: 'message',
        payload: {
            message: text
        }
    }));
};

// WebSocket Setup
let server;

const URL = 'ws://localhost:8080/websocket';
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');

if (roomId) {
    roomPopup.style.display = 'none'; // Hide the popup if roomId is present in the URL

    server = new WebSocket(URL);

    server.onopen = () => {
        submitButton.disabled = false;

        server.send(JSON.stringify({
            type: 'join',
            payload: {
                roomId: roomId
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

    server.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };

    server.onclose = (event) => {
        console.log('WebSocket closed:', event);
        submitButton.disabled = true;
    };

    submitButton.addEventListener('click', sendMessage);
    inputMessage.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
} else {
    // Show the popup if no roomId is present in the URL
    roomPopup.style.display = 'block';
}

// Event Listeners
enterRoomButton.addEventListener('click', () => {
    const roomId = roomIdInput.value.trim();
    if (roomId === "") return;

    // Redirect to the same page with the roomId as a query parameter
    window.location.search = `?roomId=${roomId}`;
});
