const express = require("express");
const { authVerify } = require("../Middleware/Authentication");
const {
  toViewDoList,
  toAddDoList,
  toCompleteTask,
  toDeleteTask,
  toCancelTask,
} = require("../Controller/ToDoListController");
const router = express.Router();

router.route("/").get(authVerify, toViewDoList).post(authVerify, toAddDoList);

router
  .route("/:id")
  .delete(authVerify, toDeleteTask)
  .patch(authVerify, toCompleteTask);

router.patch("/cancel/:id",authVerify, toCancelTask);

module.exports = router;
