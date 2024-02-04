const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require('http');
const { Server: SocketIOServer } = require('socket.io');

dotenv.config();

var corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, DELETE, PUT",
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.json());


const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const userRoutes = require("./Routes/userRoutes")
const chatRoutes = require("./Routes/chatRoutes")
const messageRoutes = require("./Routes/messageRoutes")


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/chatit");
        // await mongoose.connect(MONGO_URL);
        console.log("DataBase connected successfully")
    } catch (error) {
        console.log("Couldn't connect to database : ", error.message)
    }
}
connectDB();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
    pingTimeout: 60000,
});

server.listen(PORT, console.log(`server is running on ${PORT}`)
)

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('disconnect', () => {
        console.log("user ", socket.id, ' disconnected.');
    });

    socket.on("setup", (userId) => {
        socket.join(userId);
        // console.log("Server is Joined by User : ", userId);
        socket.emit("connected");
    })

    socket.on("joinChat", (room) => {
        socket.join(room);
        // console.log("user joined in room: ", room);
    });

    socket.on("newMessage", (newMessageStatus) => {
        var chat = newMessageStatus.chat;
        // console.log("Chat - ", chat);

        if (!chat.users)
            return console.log("chat.users are not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageStatus.sender._id)
                return;
            socket.in(user._id).emit("messagRecieved", newMessageStatus);
        });
    })
});


app.get("/", (req, res) => {
    res.send("Welcome to home page 2");
})

app.use("/user", userRoutes)

app.use("/chat", chatRoutes);

app.use("/message", messageRoutes);