'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Pets',
      'organizationId',
      Sequelize.INTEGER
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Pets',
      'organizationId'
    );
  }
};
