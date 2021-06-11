'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Vets', 'phone', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Vets', 'services', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Vets', 'profile', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Vets', 'latitude', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Vets', 'longitude', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Vets', 'phone'),
      queryInterface.removeColumn('Vets', 'services'),
      queryInterface.removeColumn('Vets', 'profile'),
      queryInterface.removeColumn('Vets', 'latitude'),
      queryInterface.removeColumn('Vets', 'longitude')
    ]);
  }
};
