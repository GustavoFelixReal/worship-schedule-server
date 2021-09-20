const Sequelize = require('sequelize');
const db = require('./index');

const Schedules = require('./schedules');
const ScheduleItemsStatus = require('./schedule-items-status');
const ScheduleItemsTypes = require('./schedule-items-types');
const Users = require('./users');

const ScheduleItems = db.define('schedule_items', {
  scheduleItemId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(255),
  },
  order: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  fileName: {
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
  isDeleted: {
    allowNull: false,
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  }
});

// ScheduleItems and Schedules relationships

ScheduleItems.belongsTo(Schedules, {
  constraint: true,
  foreignKey: 'scheduleId',
});

Schedules.hasMany(ScheduleItems, {
  foreignKey: 'scheduleId',
});

// ScheduleItems and ScheduleItemsTypes relationships

ScheduleItems.belongsTo(ScheduleItemsTypes, {
  constraint: true,
  foreignKey: 'typeId',
});

ScheduleItemsTypes.hasMany(ScheduleItems, {
  foreignKey: 'typeId',
});

// ScheduleItems and ScheduleItemsStatus relationships

ScheduleItems.belongsTo(ScheduleItemsStatus, {
  constraint: true,
  foreignKey: 'statusId',
});

ScheduleItemsStatus.hasMany(ScheduleItems, {
  foreignKey: 'statusId',
});

// ScheduleItems and Users relationships

ScheduleItems.belongsTo(Users, {
  constraint: true,
  foreignKey: 'userId',
});

Users.hasMany(ScheduleItems, {
  foreignKey: 'userId',
});

module.exports = ScheduleItems;