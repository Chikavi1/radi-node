'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Pets', 'type', {
        type: Sequelize.INTEGER
      });
      await queryInterface.addColumn('Pets', 'size', {
        type: Sequelize.STRING
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Pets', 'type');
      await queryInterface.removeColumn('Pets', 'size');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
