const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
  },
  {
    sequelize,
    modelName: 'todo',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Todo;
