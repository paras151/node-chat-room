var socket = io(); 

socket.on('connect',function(){
    console.log("Connected to server");
    
    socket.emit('createMessage',{
        from:'jen@exmpl.com',
        text:"Yup,that works for me"
    });
});

socket.on('disconnect',function(){
    console.log("Disconnected from server")
});

socket.on('newMessage',function(message){
    console.log("New Message",message);
})
