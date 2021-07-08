'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('Vets', 'email', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      await queryInterface.addColumn('Vets', 'password', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Vets', 'email');
    await queryInterface.removeColumn('Vets', 'password');
  }
};
