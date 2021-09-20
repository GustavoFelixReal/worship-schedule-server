const Sequelize = require('sequelize');
const db = require('./index');

const ScheduleStatus = require('./schedule-status');

const Schedules = db.define('schedules', {
  scheduleId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(50),
  },
  isArchived: {
    allowNull: false,
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
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
});

// Schedules and scheduleStatus relationships

Schedules.belongsTo(ScheduleStatus, {
  constraint: true,
  foreignKey: 'statusId',
});

ScheduleStatus.hasMany(Schedules, {
  foreignKey: 'statusId',
});

module.exports = Schedules;