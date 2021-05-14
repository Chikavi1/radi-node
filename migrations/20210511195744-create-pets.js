'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      id_vacumms: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      verified: {
        type: Sequelize.INTEGER
      },
      specie: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      geolocation: {
        type: Sequelize.STRING
      },
      id_organization: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pets');
  }
};