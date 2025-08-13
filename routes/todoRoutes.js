// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST new todo
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = await Todo.create({ text });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

// PUT update todo (e.g., toggle completed)
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update todo' });
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
