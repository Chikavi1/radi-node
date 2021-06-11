'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Vets', 'location');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Vets', 'location', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
