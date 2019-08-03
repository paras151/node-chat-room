const path = require('path'); 
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');

const app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log("New user connected");

    socket.on("disconnect",()=>{
        console.log("User was disconnected")
    })
    socket.emit('newMessage',{
        from: "John",
        text: "See you then",
        createAt:"123"
    });

    socket.on('createMessage',(newMessage)=>{
        console.log('createMessage',newMessage);
    })

})


var port = process.env.PORT||3000;
server.listen(port,()=>{
    console.log("Server started on port "+port)
})