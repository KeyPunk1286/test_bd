'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { name: 'John Doe', email: 'john@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
