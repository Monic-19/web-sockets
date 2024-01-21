const express = require("express")
const app = express();
app.use(express.json());
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const userRoutes = require("./Routes/userRoutes")


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