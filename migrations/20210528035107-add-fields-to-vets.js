'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vets', 'phone', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vets', 'services', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vets', 'profile', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vets', 'latitude', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('vets', 'longitude', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('vets', 'phone'),
      queryInterface.removeColumn('vets', 'services'),
      queryInterface.removeColumn('vets', 'profile'),
      queryInterface.removeColumn('vets', 'latitude'),
      queryInterface.removeColumn('vets', 'longitude')
    ]);
  }
};
