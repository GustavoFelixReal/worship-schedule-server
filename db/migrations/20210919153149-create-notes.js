'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('notes', {
      noteId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      scheduleId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
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
    }).then(() => {
      queryInterface.addConstraint('notes', {
        type: 'foreign key',
        name: 'schedule_id_notes_fk',
        fields: ['scheduleId'],
        references: {
          table: 'schedules',
          field: 'scheduleId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      queryInterface.addConstraint('notes', {
        type: 'foreign key',
        name: 'user_id_notes_fk',
        fields: ['userId'],
        references: {
          table: 'users',
          field: 'userId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notes');
  }
};
