const express = require("express");
const {check} = require("express-validator");
const auth = require("../Auth");

const router = express.Router();

const login = require("../CONTROLLERS/userControllers").login;
const signup = require("../CONTROLLERS/userControllers").signup;
const getUsers = require("../CONTROLLERS/userControllers").getUsers;

router.post("/login" , [check("email").isEmail() , check("password").isLength({min : 6})] , login );
router.post("/signup" ,  [check("username").isLength({min:6}) , check("email").isEmail() , check("password").isLength({min:6})] , signup);
router.get("/" , auth ,getUsers );

module.exports = router;