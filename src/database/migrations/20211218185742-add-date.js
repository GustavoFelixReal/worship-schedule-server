'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Schedules', 'date', { 
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date(),
    });
  },

  down: async (queryInterface, _) => {
    return queryInterface.removeColumn('Schedules', 'date');
  }
};
