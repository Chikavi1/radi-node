'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Vets', 'points');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Vets', 'points', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
