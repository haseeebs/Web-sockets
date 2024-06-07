const Websocket = require('ws');

const wss = new Websocket.Server({
    port: 8080
});

wss.on('connection', (ws) => {
    console.log('Server is running...');
    ws.on('message', (data) => {
        ws.send(data.toString());
        // console.log(data.toString()); // Convert buffer to string (if data is UTF-8 encoded)
    });
})