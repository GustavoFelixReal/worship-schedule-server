'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('schedule_items_status', {
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedule_items_status');
  }
};

