'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'points',
      Sequelize.INTEGER
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'points'
    );
  }
};
