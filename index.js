const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./Config/db");

const userRoute = require("./Routes/userRoute");
const toDoRoute = require("./Routes/toDoRoute");

const app = express();
const corsOptions = {
  origin: "https://todo-wa1k.onrender.com",
  methods: "GET,POST,PATCH,PUT,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
connectDB();
app.use("/", userRoute);
app.use("/todo", toDoRoute);

app.listen(process.env.PORT || 3000, () =>
  console.log(`running on port ${process.env.PORT}`)
);
