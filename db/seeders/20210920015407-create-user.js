'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      isAdmin: 1,
      name: 'Sonoplastia',
      ip: '127.0.0.1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isBlocked: 0,
      isDeleted: 0,
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
