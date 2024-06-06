const http = require('http');
const WebSocketServer = require('websocket').server;

const PORT = 8080;

const server = http.createServer((req, res) => {
    res.write('haseeb bhiya web sockets sikh rahe hain...');
    res.end();
});

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

const websocket = new WebSocketServer({
    httpServer: server
});

let clientConnection = null;

websocket.on('request', (req) => {
    clientConnection = req.accept(null, req.origin);

    clientConnection.on('open', () => {
        console.log('Connection open');
    });

    clientConnection.on('close', () => {
        console.log('Connection closed');
        clientConnection = null; // Clear the connection when closed
    });

    clientConnection.on('message', (message) => {
        console.log(`We received a message from client: ${message.utf8Data}`);
    });

    sendEverySeconds();
});



const sendEverySeconds = () => {
    clientConnection.send(`${Math.floor(Math.random() * 100 + 1)}`);

    setTimeout( sendEverySeconds() , 1000);
}