const express = require("express");
const {toRegister,toLogin} =require("../Controller/UserController")

const router = express.Router();

router.post("/register", toRegister);

router.post('/login',toLogin)

module.exports = router;
