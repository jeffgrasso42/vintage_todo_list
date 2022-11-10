const User = require('./User');
const Todo = require('./Todo');

User.hasMany(Todo, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Todo.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Todo };
