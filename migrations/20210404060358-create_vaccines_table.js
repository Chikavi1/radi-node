'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vaccines', {
      id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
      name: Sequelize.STRING(70),
      type: Sequelize.STRING,
      petId: Sequelize.INTEGER,
      estatus: Sequelize.INTEGER(),
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vaccines');
  }
};
