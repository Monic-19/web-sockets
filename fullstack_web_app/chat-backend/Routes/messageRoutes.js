const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const CryptoJS = require('crypto-js');

const Message = require("../models/messageSchema")
const User = require("../models/userSchema")
const Chat = require("../models/chatSchema")

router.get("/:chatId", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("reciever")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    console.error("Error from the message fetch route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//send message
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    const secretKey = `2f9a5e1c8b3d7f6a9e2c5b8a1d4f7e0a3d1c8b5a9e3c7b1f6e0a2d9c4b7a1d`;

    const encryptedContent = CryptoJS.AES.encrypt(content, secretKey).toString();

    const newMessage = {
      sender: req.user._id,
      content: encryptedContent,
      chat: chatId,
    };

    const message = await Message.create(newMessage);

    const populatedMessage = await Message.populate(message, [
      { path: "sender", select: "name pic" },
      { path: "chat" },
      { path: "reciever" },
    ]);

    const finalMessage = await User.populate(populatedMessage, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: finalMessage });

    // console.log(finalMessage)

    res.json(finalMessage);

  } catch (error) {
    console.error("Error from the message creation route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }

});


module.exports = router;