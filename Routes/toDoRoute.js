const express = require("express");
const { authVerify } = require("../Middleware/Authentication");
const {
  toViewDoList,
  toAddDoList,
  toCompleteTask,
  toDeleteTask,
  toCancelTask,
  toGetCounts,
  toGetSortedList,
} = require("../Controller/ToDoListController");
const router = express.Router();

router
  .route("/")
  .get(authVerify, toViewDoList)
  .post(authVerify, toAddDoList)
  .patch(authVerify, toCompleteTask);

router.route("/:id").delete(authVerify, toDeleteTask);

router.patch("/cancel", authVerify, toCancelTask);

router.get("/counts", authVerify, toGetCounts);

router.get("/reports", authVerify, toGetSortedList);

module.exports = router;
