const mongoose = require("mongoose");
const toDoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      min: 1,
      max: 9,
      required: true,
    },
    status: {
      type: String,
      default: "1-Pending",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const toDoModel = mongoose.model("toDo", toDoSchema);

module.exports = toDoModel;
