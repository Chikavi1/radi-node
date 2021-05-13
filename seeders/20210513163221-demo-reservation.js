'use strict';
const faker = require('faker/locale/en');
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let insertar = [];
    for (let i = 0; i < 5; i++) {
      insertar.push({
        name: faker.name.findName(),
        note: faker.lorem.words(),
        payment: 0,
        price: 100,
        id_vet: 1,
        id_pet: 1,
        time: moment(faker.date.future()).format('YYYY-MM-DD'),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('reservations', insertar, {});
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
    await queryInterface.bulkDelete('reservations', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
