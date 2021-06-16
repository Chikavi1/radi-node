'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Pets', 'id_organization');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Pets', 'id_organization', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
