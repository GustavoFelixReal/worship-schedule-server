'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('schedules', {
      scheduleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      statusId: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
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
    }).then(() => queryInterface.addConstraint('schedules', {
      type: 'foreign key',
      name: 'status_id_schedules_fk',
      fields: ['statusId'],
      references: {
        table: 'schedule_status',
        field: 'statusId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedules');
  }
};
