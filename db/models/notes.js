const Sequelize = require('sequelize');
const db = require('./index');

const Schedules = require('./schedules');
const Users = require('./users');

const Notes = db.define('notes', {
  noteId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT,
  },
  subject: {
    type: Sequelize.STRING(50),
  },
  text: {
    allowNull: false,
    type: Sequelize.STRING(255),
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
  isSystemNote: {
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

// Notes and Schedules relationships

Notes.belongsTo(Schedules, {
  constraint: true,
  foreignKey: 'scheduleId',
});

Schedules.hasMany(Notes, {
  foreignKey: 'scheduleId',
});

// Notes and Users relationships

Notes.belongsTo(Users, {
  constraint: true,
  foreignKey: 'userId',
});

Users.hasMany(Notes, {
  foreignKey: 'userId',
});

module.exports = Schedules;