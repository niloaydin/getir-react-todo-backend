const TodoModel = require("../models/todoModel");

const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const newTodo = await TodoModel.create({
      text: req.body.text,
      completed: req.body.completed,
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const elementsToBeUpdated = Object.keys(req.body);
    const todoToUpdate = await TodoModel.findById(req.params.id);

    elementsToBeUpdated.forEach((el) => {
      todoToUpdate[el] = req.body[el];
    });

    const updatedTodo = await todoToUpdate.save();
    return res.status(201).json(updatedTodo);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedTodo);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
