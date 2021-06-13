'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Organizations', 'longitude', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Organizations', 'latitude', {
        type: Sequelize.STRING,
        allowNull: true
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Organizations', 'latitude');
    queryInterface.removeColumn('Organizations', 'longitude');
  }
};
