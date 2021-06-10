'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Pets', 'longitude', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Pets', 'latitude', {
        type: Sequelize.STRING,
        allowNull: true
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Pets', 'latitude');
    queryInterface.removeColumn('Pets', 'longitude');
  }
};
