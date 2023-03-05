const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();

//determine the endpoints here
router.get("/", todoController.getTodos);
router.post("/", todoController.addTodo);
router.patch("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
