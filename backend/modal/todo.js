const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  nameTodo: {
    type: String,
    required: true,
    unique: true
  },
  todoContent: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("todo", TodoSchema);