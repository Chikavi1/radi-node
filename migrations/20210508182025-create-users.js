'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING,
      },
      cellphone: Sequelize.INTEGER(11),
      invoice_id: Sequelize.INTEGER,
      active:{
        type: Sequelize.INTEGER,
        defaulValue: 0 
      },
      expiration: Sequelize.DATE,
      identification: Sequelize.INTEGER,
      share_location: Sequelize.INTEGER(1),
      googleId:{
          type: Sequelize.STRING(60),
          allowNull: true
      },
      points: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Users');
  }
};