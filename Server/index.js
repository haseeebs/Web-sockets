const Websocket = require('ws');

const wss = new Websocket.Server({
    port: 8080
});

const clients = [];

wss.on('connection', (ws) => {
    console.log(`Server is running...${ws}`);
    clients.push(ws)
    ws.on('message', (data) => {
        clients.forEach(client => client.send(data.toString()));
    });
})