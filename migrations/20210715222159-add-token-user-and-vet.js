'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('Users', 'token', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      await queryInterface.addColumn('Vets', 'token', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'token');
    await queryInterface.removeColumn('Vets', 'token');
  }
};
