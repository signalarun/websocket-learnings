const chalk = require('chalk');
const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log(chalk.green(`user( ${socket.id.substr(0, 2)}) connected`));

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `Broadcast : ${socket.id.substr(0, 2)} said ${message}`);
    socket.emit('message', `me : said ${message}`);
  });

  socket.on('disconnect', (reason) => {
    // This event is fired by default by the Socket instance upon disconnection.
    // // Refer : https://socket.io/docs/v4/server-socket-instance/#disconnect
    console.log(`user( ${socket.id.substr(0, 2)})`);
    if(reason == "server namespace disconnect"){
      console.log(chalk.red("The socket was forcefully disconnected with socket.disconnect"));
    }
    else if(reason === "client namespace disconnect"){
      console.log("The client has manually disconnected the socket using socket.disconnect()");
    }
    else if (reason === "server shutting down") {
      console.log(chalk.red("The server is, well, shutting down"));
      // the disconnection was initiated by the server, you need to reconnect manually
      //socket.connect();
    } else if (reason === "ping timeout") {
      console.log(chalk.red("The client did not send a PONG packet in the pingTimeout delay"));

    } else if (reason === "transport close") {
      console.log(chalk.red("The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G)"));
    } else if (reason === "transport error") {
      console.log(chalk.red("The connection has encountered an error (example: the server was killed during a HTTP long-polling cycle)"));
    } else {
      console.log(chalk.red("Disconnected from server without server side action, client will auto reconnect!"));
      // else the socket will automatically try to reconnect
    }
   }
  );

  socket.on('terminate-me', () => {
    socket.disconnect(true);
  });


});

/*
 Regular Websockets
 const WebSocket = require('ws')
 const server = new WebSocket.Server({ port: '8080' })
 server.on('connection', socket => { 
   socket.on('message', message => {
     socket.send(`Roger that! ${message}`);
   });
 });
*/

http.listen(8080, () => console.log('listening on http://localhost:8080'));
