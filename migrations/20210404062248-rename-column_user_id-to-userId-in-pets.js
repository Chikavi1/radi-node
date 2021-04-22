'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('pets', 'user_id', 'userId');

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('pets', 'userId', 'user_id');

  }
};
