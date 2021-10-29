'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'churchId', { 
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }).then(() => queryInterface.addConstraint('Users', {
        fields: ['churchId'],
        type: 'foreign key',
        name: 'church_id_users_fk',
        references: {
          table: 'Churches',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      } 
    ));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'church_id_users_fk');
  }
};
