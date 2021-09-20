'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('schedule_items', {
      scheduleItemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      scheduleId: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      typeId: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      statusId: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
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
    }).then(() => {
      queryInterface.addConstraint('schedule_items', {
        type: 'foreign key',
        name: 'schedule_id_schedule_items_fk',
        fields: ['scheduleId'],
        references: {
          table: 'schedules',
          field: 'scheduleId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      queryInterface.addConstraint('schedule_items', {
        type: 'foreign key',
        name: 'type_id_schedule_items_fk',
        fields: ['typeId'],
        references: {
          table: 'schedule_items_types',
          field: 'typeId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      queryInterface.addConstraint('schedule_items', {
        type: 'foreign key',
        name: 'status_id_schedule_items_fk',
        fields: ['statusId'],
        references: {
          table: 'schedule_items_status',
          field: 'statusId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
      queryInterface.addConstraint('schedule_items', {
        type: 'foreign key',
        name: 'user_id_schedule_items_fk',
        fields: ['userId'],
        references: {
          table: 'users',
          field: 'userId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedule_items');
  }
};
