// models/Todo.js
const mongoose = require('mongoose');

// Define schema for a Todo
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,      // Task text must be provided
  },
  completed: {
    type: Boolean,
    default: false       // Default is not completed
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// Export the model to use it elsewhere
module.exports = mongoose.model('Todo', todoSchema);
