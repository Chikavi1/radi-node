'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Pets', 'id_vacumms');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Pets', 'id_vacumms', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
