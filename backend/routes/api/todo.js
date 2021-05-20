const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Todo = require("../../modal/todo");
const config = require("config");
router.post(
  "/addTodo",
  [
    check("nameTodo", "Name of ToDo is required").not().isEmpty(),
    check("todoContent", "ToDo Content is required").not().isEmpty(),
  ],
  async (req, res) => {
    const { nameTodo, todoContent } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      //Check if user exist
      let todo = await Todo.findOne({ nameTodo });
      if (todo)
        return res
          .status(400)
          .json({ errors: [{ msg: "ToDo already exist" }] });
      //getting user avatar
      todo = new Todo({
        nameTodo,
        todoContent
      });

      await todo.save();
        res.send("ToDo regsitered");
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

router.get("/getTodo", async (req, res) => {
  try {
    const todoName = await Todo.find()

    if (!todoName) return res.status(400).json({ msg: "Todo not found" });

    res.json(todoName);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Todo not found" });
    }
    return res.status(500).json("Server Error");
  }
});

router.delete("/deleteTodo/:id", async (req, res) => {
  //Delete profile
  await Todo.findOneAndRemove({ todo: req.params._id });

  //Delete user
  // await User.findOneAndRemove({ _id: req.user.id });

  res.json({ msg: "ToDo Deleted" });
});

// @route POST profile/experience
// @desc  add experience
// @access Private

router.put(
  "/updateTodo/:id",
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
      const {
        nameTodo, todoContent
      } = req.body;
      const updatedTodo = {
        nameTodo, todoContent
      };
    try {
      let todoName = await Todo.findOne({ todo: req.params._id });
      console.log(updatedTodo);
      // todoName.unshift(updatedTodo);
      // updatedTodo = new Todo({
      //   nameTodo,
      //   todoContent
      // });
      // const updatedTodo = {
      //   nameTodo, todoContent
      // };
    //   todoName = [
    //     updatedTodo
    // ]
    todoName.nameTodo = updatedTodo.nameTodo
    todoName.todoContent = updatedTodo.todoContent
      await todoName.save();
      res.json(todoName);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);


module.exports = router;