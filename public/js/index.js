

var socket = io(); 

socket.on('connect',function(){
    console.log("Connected to server");
    
    
});

socket.on('disconnect',function(){
    console.log("Disconnected from server")
});

socket.on('newMessage',function(message){
    // console.log("New Message",message);
    var formattedTime = moment(message.createdAt).format('LT');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`)
    // jQuery('#messages').append(li);

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    });

    jQuery('#messages').append(html);
})

socket.on('newLocationMessage',function(message){
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>')
    var formattedTime = moment(message.createdAt).format('LT');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formattedTime
    });
    jQuery('#messages').append(html);

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
})



// socket.emit('createMessage',{
//     from:"Erik",
//     text:"Erik is all fit and fine",
//     createdAt:new Date().getTime()
// },(s)=>{
//     console.log("Got it "+s);
// })

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){
        

    })
    // jQuery('[name=message]').val('');

})

var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },function(){
        alert('Unable to fetch location');
    })
})