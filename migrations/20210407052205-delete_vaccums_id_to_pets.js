'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Pets',
      'vacumms_id'
    );
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};
