'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Medicines', 'id_pet', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Medicines', 'id_pet')
  }
};
