const app = require('express')();
const server = require('http').createServer(app)
const cors = require('cors');

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

const port = process.env.PORT || 5002;

app.get('/', (req, res) => {
    res.send("welcome");
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit('call ended');
    })

    socket.on('calluser', ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit('calluser', {signal : signalData, from , name});
    });

    socket.on('answercall', (data) => {
        io.to(data.to).emit('callaccepted', data.signal)
    });

})

server.listen(port , () => console.log(`server is listening on ${port} port`));
