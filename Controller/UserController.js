const userModel = require("../Model/UserModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//User Registration

const toRegister = async (req, res) => {
  try {
    const { name, email, password } = req?.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "field cannot be blank" });
    const User = await userModel.findOne({ email });
    if (User) return res.status(400).json({ message: "user already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error?.response?.data);
  }
};

//User Login

const toLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await userModel.findOne({ email });
    if (!User) return res.status(404).json({ message: "User not found" });
    const passwordMatch = await bcrypt.compare(password, User.password);
    if (!passwordMatch)
      return res.status(404).json({ message: "Password does not match" });
    const token = generateToken(User?._id);
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json(error?.response?.data);
  }
};

//To Generate JWT Token
const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};
module.exports = { toRegister, toLogin };
