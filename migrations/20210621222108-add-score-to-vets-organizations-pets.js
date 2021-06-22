'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('Vets', 'score', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      await queryInterface.addColumn('Pets', 'score', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      await queryInterface.addColumn('Organizations', 'score', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Vets', 'score');
    await queryInterface.removeColumn('Pets', 'score');
    await queryInterface.removeColumn('Organizations', 'score');
  }
};
