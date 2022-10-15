const express = require("express");
const router = express.Router();
const getChat = require("../CONTROLLERS/chatControllers").getChat;
const sendMessage= require("../CONTROLLERS/chatControllers").sendMessage;
const auth = require("../Auth");

router.get("/" , getChat);
router.post("/send" ,auth , sendMessage);

module.exports = router;