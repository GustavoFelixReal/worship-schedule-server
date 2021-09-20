const Sequelize = require('sequelize');
const db = require('./index');

const Users = db.define('users', {
  userId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT,
  },
  isAdmin: {
    allowNull: false,
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(50),
  },
  ip: {
    allowNull: false,
    type: Sequelize.STRING(50),
  },
  macAddress: {
    type: Sequelize.STRING(50),
  },
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE,
  },
  isBlocked: {
    allowNull: false,
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  },
  isDeleted: {
    allowNull: false,
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Users;