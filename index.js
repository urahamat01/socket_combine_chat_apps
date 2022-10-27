//server setup
const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);


const { Server } = require('socket.io');

let io = new Server(expressServer);


//get index.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")

})


//log message log print chat message client to server
io.on('connection', function (socket) {
    socket.on('chat', function (msg) {
        io.emit('chat_transfer', msg);
        console.log(msg);

    },)

},)


io.on('connection', function (socket) {
    socket.join('Hello');

    socket.join('Rony');
    socket.join('MYHome');
    let sizeOfHome = io.sockets.adapter.rooms.get('MYHome').size;
    io.sockets.in('Hello').emit('connecting', 'Tume kamon aco' + sizeOfHome);
    io.sockets.in('Rony').emit('Name', 'This is my name');
})


expressServer.listen(3000, function () {
    console.log('Express Server run @3000----');
})