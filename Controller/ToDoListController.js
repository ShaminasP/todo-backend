const { response } = require("express");
const ToDoModel = require("../Model/ToDoModel");
const { default: mongoose } = require("mongoose");

//To add Task to the DO LIST
const toAddDoList = async (req, res) => {
  try {
    const { task, priority } = req.body;
    console.log(req.body);
    const user = req?.user?.id;
    if (!task || !priority)
      return res.status(204).json({ message: "fields cannot be empty" });
    const newTask = await ToDoModel.create({
      task,
      priority,
      user,
    });
    res.status(200).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

// To View the LIST of tasks
const toViewDoList = async (req, res) => {
  try {
    const user = req?.user?.id;
    const tasks = await ToDoModel.find({
      user,
      status: { $ne: "Deleted" },
    }).sort({
      priority: 1,
    });
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

// To  Complete a task
const toCompleteTask = async (req, res) => {
  try {
    const ID = req?.body?.id;
    const user = req?.user?.id;
    const task = await ToDoModel.findById(ID);
    if (!task) return res.status(404).json({ message: "Invalid id provided" });
    const completedTask = await ToDoModel.updateOne(
      { _id: ID, user },
      { status: "Completed" }
    );
    res.status(200).json({ message: "task completed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

// To cancel a task
const toCancelTask = async (req, res) => {
  try {
    const ID = req?.body?.id;
    const user = req?.user?.id;
    const task = await ToDoModel.findById(ID);
    if (!task) return res.status(404).json({ message: "Invalid id provided" });
    const cancelledTask = await ToDoModel.updateOne(
      { _id: ID, user },
      { status: "Cancelled" }
    );
    res.status(200).json({ message: "task cancelled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

// To delete a task
const toDeleteTask = async (req, res) => {
  try {
    const user = req?.user?.id;
    const ID = req?.params?.id;
    const task = await ToDoModel.findOneAndUpdate(
      { _id: ID, user },
      { $set: { status: "Deleted" } }
    );

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

//to get counts
const toGetCounts = async (req, res) => {
  try {
    const user = req?.user?.id;
    const result = await ToDoModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

//to getSorted lists
const toGetSortedList = async (req, res) => {
  try {
    const user = req?.user?.id;
    const [pending, completed, cancelled] = await Promise.all([
      ToDoModel.find(
        { status: "Pending",user },
        { priority: 0, user: 0, _id: 0 }
      ).sort({ priority: 1 }),
      ToDoModel.find(
        { status: "Completed",user },
        { priority: 0, user: 0, _id: 0 }
      ).sort({ priority: 1 }),
      ToDoModel.find(
        { status: "Cancelled",user },
        { priority: 0, user: 0, _id: 0 }
      ).sort({ priority: 1 }),
    ]);

    res.status(200).json([...pending, ...cancelled, ...completed]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

module.exports = {
  toAddDoList,
  toViewDoList,
  toCompleteTask,
  toCancelTask,
  toDeleteTask,
  toGetCounts,
  toGetSortedList,
};
