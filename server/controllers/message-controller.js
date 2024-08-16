import Conversation from "../models/conversion-model.js";
import Message from "../models/message-mode.js";
import User from "../models/user-model.js";
import { getReceiverId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    const receId = getReceiverId(receiverId);

    if (receId) {
      console.log("Senindg message...........", newMessage);
      console.log("=======end---------");
      io.to(receId).emit("newMessage", newMessage);

      const user = await User.find({ _id: newMessage.senderId });
      if (user) {
        console.log("iuser..........", user[0].fullName);
        io.to(receId).emit("GetNot", {
          message: " Messaged You",
          senderName: user[0].fullName,
        });
      }
      // console.log("sending not", message);
    }

    // SOCKET IO FUNCTIONALITY WILL GO HERE

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    console.log();

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
