const express = require("express");
const { authVerify } = require("../Middleware/Authentication"); // importing middleware for authentication
const {
  toViewDoList,
  toAddDoList,
  toCompleteTask,
  toDeleteTask,
  toCancelTask,
  toGetCounts,
  toGetSortedList,
} = require("../Controller/ToDoListController");  // importing functions from Controllers
const router = express.Router();

router
  .route("/")
  .get(authVerify, toViewDoList) // To view the added do lists

  .post(authVerify, toAddDoList) // To add a task to the list
  
  .patch(authVerify, toCompleteTask); // To Make a task completed


router.route("/:id").delete(authVerify, toDeleteTask); //To delete task

router.patch("/cancel", authVerify, toCancelTask); // To cancel task

router.get("/counts", authVerify, toGetCounts); // TO get count

router.get("/reports", authVerify, toGetSortedList); // To get reports

module.exports = router;
