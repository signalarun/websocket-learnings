const socket = io('ws://localhost:8080');

socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

    window.setInterval(function() {
        var elem = document.getElementById('chat');
        elem.scrollTop = elem.scrollHeight;
      }, 400);

});

socket.on("disconnect", (reason) => {
    // Refer : https://socket.io/docs/v3/client-socket-instance/
    if (reason === "io server disconnect") {
      alert("Server initiated disconnection");
      // the disconnection was initiated by the server, you need to reconnect manually
      //socket.connect();
    }else if(reason === "io client disconnect"){
        alert("The socket was manually disconnected using socket.disconnect()");
        
    }else if(reason == "ping timeout"){
        alert("The server did not send a PING within the pingInterval + pingTimeout range");
    }else if(reason === "transport close"){
      alert("The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G)");
    }else if(reason === "transport error"){
        alert("The connection has encountered an error (example: the server was killed during a HTTP long-polling cycle)");
    }else{
        alert("Disconnected from server without server side action, client will auto reconnect!");
       // else the socket will automatically try to reconnect
    }    
});

socket.on("connect_error", (err) => {
    alert(`connect_error due to ${err.message}`);
    console.log(`connect_error due to ${err.message}`);
});

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}

/**
 * Terminating socket with the help of server
 */
function terminate(){
    socket.emit('terminate-me');
}

// Regular Websockets

// const socket = new WebSocket('ws://localhost:8080');

// // Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello world!');
// }
