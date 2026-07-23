// const ChatMessage = require("../models/ChatMessage.js");

// exports.saveMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Message is required" });
//     }

//     const newMsg = new ChatMessage({ message });
//     await newMsg.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Message saved successfully" });
//   } catch (error) {
//     console.error("❌ Error saving chat message:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// };



const ChatMessage = require("../models/ChatMessage.js");

// Save a new message
exports.saveMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: "Message required" });
    }

    const newMsg = new ChatMessage({ message });
    await newMsg.save();

    res.status(200).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("❌ Error saving chat message:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("❌ Error fetching messages:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
