const { response } = require("express");
const ToDoModel = require("../Model/ToDoModel");

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
    const tasks = await ToDoModel.find({ user }).sort({ priority: 1 });
    res.status(200).json({tasks});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

// To  Complete a task
const toCompleteTask = async (req, res) => {
  try {
    const ID = req?.params?.id;
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
    const ID = req?.params?.id;
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
    const task = await ToDoModel.findOne({ _id: ID, user });
    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

module.exports = {
  toAddDoList,
  toViewDoList,
  toCompleteTask,
  toCancelTask,
  toDeleteTask,
};
