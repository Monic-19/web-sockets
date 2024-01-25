const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const Message = require("../models/messageSchema")
const User = require("../models/userSchema")
const Chat = require("../models/chatSchema")

router.get("/:chatId", authMiddleware , async(req,res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name email")
          .populate("reciever")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
})

//send message
router.post("/", authMiddleware , async(req,res) => {
    const { content, chatId } = req.body;
 
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    console.log(message);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await message.populate("reciever");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
})

module.exports = router;