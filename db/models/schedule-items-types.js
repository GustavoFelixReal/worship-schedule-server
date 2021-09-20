const Sequelize = require('sequelize');
const db = require('./index');

const ScheduleItemsTypes = db.define('schedule_items_types', {
  typeId: {
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

module.exports = ScheduleItemsTypes;