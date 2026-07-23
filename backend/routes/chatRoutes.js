// const express = require("express");
// const { saveMessage } = require("../controllers/chatController.js");

// const router = express.Router();

// console.log("✅ Chat route file loaded");

// router.post("/", saveMessage);

// module.exports = router;


const express = require("express");
const { saveMessage, getMessages } = require("../controllers/chatController.js");
const router = express.Router();

console.log("✅ Chat route file loaded");

// POST: Save a message
router.post("/", saveMessage);

// GET: Retrieve all messages
router.get("/", getMessages);

module.exports = router;
