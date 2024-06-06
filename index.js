const PORT = 8080;
const http = require('http');

const server = http.createServer((req, res) => {
    res.write('haseeb bhiya web sockets sikh rahe hain...');
    res.end();
})

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

// const http = require('http');

// const app = require('express')();

// app.get('/', (req, res) => {
//     res.send('haseeb bhiya web socket sikh rahe hain...')
// })

// app.listen(PORT, () => {
//     console.log(`server is listning on port ${PORT}`);
// })