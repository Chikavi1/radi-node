'use strict';
const faker = require('faker/locale/en');
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let insertar = [];
    for (let i = 0; i < 5; i++) {
      insertar.push({
        description: faker.lorem.words(),
        id_vacumms: 1,
        size: 10,
        breed: faker.lorem.word(),
        gender: 1,
        status: 1,
        id_user: 1,
        verified: 1,
        specie: faker.lorem.word(),
        code: faker.lorem.word(),
        geolocation: faker.lorem.words(),
        id_organization: 1,
        name: faker.name.findName(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('pets', insertar, {});
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
     await queryInterface.bulkDelete('pets', null, {});
  }
};
