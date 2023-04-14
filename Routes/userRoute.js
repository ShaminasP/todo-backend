const express = require("express");
const {toRegister,toLogin} =require("../Controller/UserController")

const router = express.Router();

router.post("/register", toRegister); // to register a new user

router.post('/login',toLogin) // to login 

module.exports = router;
