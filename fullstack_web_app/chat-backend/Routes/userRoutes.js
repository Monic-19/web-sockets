const express = require("express");

const Router = express.Router();
const eah = require('express-async-handler');

const UserModel = require("../models/userSchema");
const generateToken = require("../config/generateToken");



Router.post("/login", eah(async (req, res) => {
    const { name, password } = req.body;
    const user = await UserModel.findOne({ name });

    // console.log("\nfetched user data : ",user);

    console.log(await user.matchPassword(password))

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        throw new Error("Incorrect username or password")
    }

}))

Router.post("/register", eah(async (req, res) => {

    const {name, email, password} = req.body;
    console.log(name,email,password)

    if (!name || !email || !password) {
        res.status(200)
        throw new Error("All necessary input files have not been filled.")
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist)
        throw new Error("User already exists")

    const usernameExist = await UserModel.findOne({ name });
    if (usernameExist)
        throw new Error("Username already taken")

    const createdUser = await UserModel.create({ name, email, password })

    console.log(createdUser._id)

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

module.exports = Router;