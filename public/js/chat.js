var socket = io(); 

function scrolltoBottom(){
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();


    if(clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect',function(){
    var params = jQuery.deparam(window.location.search);

    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href = '/'; 
        }else{
            console.log('No error')
        }
    })
    
    
});

socket.on('disconnect',function(){
    console.log("Disconnected from server")
});

socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    })
    jQuery('#users').html(ol);
})

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
    scrolltoBottom();
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
    jQuery('[name=message]').val('');

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