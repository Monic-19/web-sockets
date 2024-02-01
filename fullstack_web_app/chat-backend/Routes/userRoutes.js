const express = require("express");

const Router = express.Router();
const eah = require('express-async-handler');

const UserModel = require("../models/userSchema");
const generateToken = require("../config/generateToken");
const authMiddleware = require("../middleware/authMiddleware");



Router.post("/login", eah(async (req, res) => {
    const { name, password } = req.body;
    const user = await UserModel.findOne({ name });

    // console.log("\nfetched user data : ",user);

    // console.log(await user.matchPassword(password))

    if (user && (await user.matchPassword(password))) {
  
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            lastLogin: user.lastLogin,
            token: generateToken(user._id),
        })
    }
    else {
        throw new Error("Incorrect username or password")
    }

}))

Router.post("/register", eah(async (req, res) => {

    const {name, email, password} = req.body;
    // console.log(name,email,password)

    if (!name || !email || !password) {
        res.status(200).json({ error: "Enter complete details" });
        throw new Error("All necessary input files have not been filled.")
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist){
        res.status(409).json({ error: "UserEmail exists" });
        throw new Error("User already exists")
    }

    const usernameExist = await UserModel.findOne({ name });
    if (usernameExist){
        res.status(408).json({ error: "Username exists" });
        throw new Error("Username already taken")
    }

    const createdUser = await UserModel.create({ name, email, password })

    // console.log(createdUser._id)

    if (createdUser) {
        res.status(201).json({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser._id)
        })
    }
    else {
        res.status(400);
        throw new Error("Registration error")
    }
}))

Router.get("/profile", authMiddleware, eah(async (req, res) => {
    try {
      const userdata = req.user;
      // console.log(userdata)
      return res.status(200).json({ msg: userdata });
    } catch (error) {
      console.error("Error from the user route:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }));
  

  Router.get("/fetchUsers", authMiddleware, eah(async (req, res) => {
    try {
      const keyword = req.query.search
        ? {
            $or: [
              { name: { $regex: req.query.search, $options: "i" } },
              { email: { $regex: req.query.search, $options: "i" } },
            ],
          }
        : {};
  
      const users = await UserModel.find(keyword).find({
        _id: { $ne: req.user._id },
      }).select({ password: 0 });
  
      // console.log(users);
      res.status(200).json(users);
    } catch (error) {
      console.error("Error from the user route:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }));
  

module.exports = Router;