const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../Client')));

const server = app.listen(8080, () => {
    console.log('Express server is running on port 8080...');
});

const wss = new WebSocket.Server({
    noServer: true
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});

wss.on('connection', (ws) => {
    console.log(`WebSocket server is running on port 8080...`);

    ws.on('message', (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        });
    });
});
