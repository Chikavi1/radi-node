'use strict';
const faker = require('faker/locale/en');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let insertar = [];
    for (let i = 0; i < 5; i++) {
      insertar.push({
        description: faker.lorem.words(),
        location: faker.lorem.words(),
        name: faker.name.findName(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('vets', insertar, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('vets', null, {});
  }
};
