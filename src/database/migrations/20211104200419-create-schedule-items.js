'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Schedule_Items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Schedules', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fileName: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, _) => {
    return queryInterface.dropTable('Schedule_Items');
  }
};
