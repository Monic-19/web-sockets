const express = require("express");

const Router = express.Router();
const eah = require('express-async-handler');

const UserModel = require("../models/userSchema");
const ChatModel = require("../models/chatSchema");
const authMiddleware = require("../middleware/authMiddleware");

//fetch chats
Router.get("/", authMiddleware, async (req, res) => {
  try {
    const results = await ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedResults = await UserModel.populate(results, {
      path: "latestMessage.sender",
      select: "name email",
    });

    // console.log("populated - result \n",populatedResults)

    res.status(200).send(populatedResults);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// access chats
Router.post("/", authMiddleware, eah(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId not sent with request");
    return res.status(400).send({ error: "UserId param not sent with request" });
  }

  let existingChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ]
  })
    .populate("users", "-password")
    .populate("latestMessage");

  existingChat = await UserModel.populate(existingChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (existingChat.length > 0) {
    return res.send(existingChat[0]);
  } else {
    const chatData = {
      chatName: `${req.user.name} Chat`,
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await ChatModel.create(chatData);

      const fullChat = await ChatModel.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      return res.status(200).json(fullChat);
    } catch (error) {
      console.error("Error creating chat:", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
}));


Router.get("/fetchGroup", authMiddleware, eah(async (req, res) => {
  try {
    const allGroups = await ChatModel.find({ isGroupChat: true });
    // console.log("All groups that are created - ", allGroups);
    res.status(200).send(allGroups);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}));

Router.post("/createGroup", authMiddleware,eah(async (req, res) => {

  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Data is insufficient" });
  }

  var users = JSON.parse(req.body.users);
  // console.log("list of all the users -> \n ",users)
  users.push(req.user);

  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");


    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}));


Router.put("/exitGroup", authMiddleware, eah(async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    
    const removed = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      res.status(404).send({ error: "Chat Not Found" });
    } else {
      res.json(removed);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}));


module.exports = Router;