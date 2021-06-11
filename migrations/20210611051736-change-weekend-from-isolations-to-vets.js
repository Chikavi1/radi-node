'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('Vets', 'weekend', {
        allowNull: true,
        type: Sequelize.BOOLEAN
      }),
      await queryInterface.removeColumn('Isolations', 'weekend')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('Vets', 'weekend'),
      await queryInterface.addColumn('Isolations', 'weekend', {
        allowNull: true,
        type: Sequelize.BOOLEAN
      })
    ]);
  }
};
