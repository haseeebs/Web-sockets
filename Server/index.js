const express = require('express');
const Websocket = require('ws');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../Client')));

const server = app.listen(8080, () => {
    console.log('Express server is running on port 8080...');
})

const wss = new Websocket.Server({
    server,
    verifyClient: (info) => {
        // console.log(info);
        return false;
    }
});

wss.on('connection', (ws) => {
    console.log(`Websocket server is running on port 8080...`);

    ws.on('message', (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === Websocket.OPEN) {
                client.send(data.toString())
            }
        })
    });
})