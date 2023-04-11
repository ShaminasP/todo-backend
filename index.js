const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./Config/db");

const userRoute = require("./Routes/Route");

const app = express();

app.use(express.json());
connectDB();
app.use("/", userRoute);

app.listen(process.env.PORT || 3000, () =>
  console.log(`running on port ${process.env.PORT}`)
);
