const sequelize = require('../config/connection');
const { User, Todo } = require('../models');

const userData = require('./user-seeds.json');
const todoData = require('./todo-seeds.json');
console.log(todoData);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const todos = await Todo.bulkCreate(todoData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  for (let todo of todoData) {
    await Todo.create({
      ...todo,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
