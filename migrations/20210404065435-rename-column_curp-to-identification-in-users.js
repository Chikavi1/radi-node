'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'curp', 'identification');

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'identification', 'curp');

  }
};
