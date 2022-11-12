const router = require('express').Router();
const { Todo } = require('../models');
const { checkAuth } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/dashboard', checkAuth, async (req, res) => {
  const todoData = await Todo.findAll({
    where: {
      user_id: 1,
    },
  });
  const todos = todoData.map((todo) => todo.get({ plain: true }));
  res.render('dashboard', { todos });
});

router.get('*', (req, res) => {
  res.status(404).send('page not found');
});

module.exports = router;
