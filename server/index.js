const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('user( ${socket.id.substr(0,2)}) connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `Broadcast : ${socket.id.substr(0,2)} said ${message}` );   
        socket.emit('message', `me : said ${message}` );   
    });

    socket.on('disconnect', () => {
      console.log(`user( ${socket.id.substr(0,2)}) disconnected`);
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

http.listen(8080, () => console.log('listening on http://localhost:8080') );
