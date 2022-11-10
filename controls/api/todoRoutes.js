const { Todo } = require('../../models');
const { update } = require('../../models/User');

const router = require('express').Router();

// GET api/todos - get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ err, message: 'No todos found for user' });
  }
});

// GET api/todos/:id - get todo by id
router.get('/:todoId', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.todoId,
        user_id: req.session.userId,
      },
    });
    console.log(todo);
    res.status(200).json(todo);
  } catch (err) {
    res
      .status(500)
      .json({ err, message: 'User does not own a todo with this id' });
  }
});

// POST api/todos - create a new todo
router.post('/', async (req, res) => {
  try {
    const newTodo = await Todo.create({
      ...req.body,
      user_id: req.session.userId,
    });
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT api/todos/:id - update a todo
router.put('/:todoId', async (req, res) => {
  try {
    const updatedTodo = await Todo.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.todoId,
          user_id: req.session.userId,
        },
      }
    );
    if (!updatedTodo[0]) {
      res
        .status(404)
        .json({ message: 'Perhaps no todo was found with that id' });
    }
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE api/todos/:id - delete a todo
router.delete('/:todoId', async (req, res) => {
  try {
    const destroyedTodo = await Todo.destroy({
      where: {
        id: req.params.todoId,
        user_id: req.session.userId,
      },
    });
    if (!destroyedTodo) {
      res
        .status(404)
        .json({ message: 'Perhaps no todo was found with that id' });
    }
    res.status(200).json(destroyedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
