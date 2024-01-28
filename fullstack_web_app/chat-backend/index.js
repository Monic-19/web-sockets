const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")

dotenv.config();

var corsOptions = {
    origin : "http://localhost:5173",
    methods : "GET, POST, DELETE, PUT",
    credentials : true
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
        console.log("Couldn't connect to database : ",error.message)
    }
}
connectDB();

app.listen(PORT, console.log(`server is running on ${PORT}`)
)

app.get("/", (req, res) => {
    res.send("Welcome to home page 2");
}) 

app.use("/user", userRoutes)

app.use("/chat", chatRoutes);

app.use("/message", messageRoutes);