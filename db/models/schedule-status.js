const Sequelize = require('sequelize');
const db = require('./index');

const ScheduleStatus = db.define('schedule_status', {
  statusId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(50),
  },
  isDeleted: {
    allowNull: false,
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  },
});

module.exports = ScheduleStatus;