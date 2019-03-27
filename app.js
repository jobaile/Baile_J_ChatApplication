var express = require('express');
var app = express();
var io = require('socket.io')(); //u need an envoker for anon functions

const port = process.env.PORT || 3000;

//tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// create server variable for socket.io to use
const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});

io.attach(server);

//socket.io chat app stuff to follow
//socket id 2dN6cSIyoW-9UV6HAAAA

io.on('connection', function(socket){
    console.log('a user has connected');
    //console.log('a user has connected', socket);

    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'} );

    socket.on('chat message', function(msg){
        console.log('message: ', msg, 'socket:', socket.id);

        // send the message toe veryone connected to the app
        io.emit('chat message', { id: `${socket.id}`, message: msg});
    });

    socket.on('disconnect', function(){
        console.log('a user has disconnected');
    });
})
