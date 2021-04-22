const Sequelize = require('sequelize');
const db = require('../config/db');
const Pets = require('./Pets');


const Adoptions = db.define('Adoptions',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
      name: Sequelize.STRING(70),
      email: Sequelize.STRING(50),
      identification: Sequelize.STRING(30),
      cellphone: Sequelize.STRING(20),
      address: Sequelize.STRING(255),
      exterior_number: Sequelize.INTEGER(10),
      interior_number: Sequelize.INTEGER(10),
      zip: Sequelize.INTEGER(10),
      neighborhood: Sequelize.STRING,
      city: Sequelize.STRING(170),
      state: Sequelize.STRING(40),
      userId: Sequelize.INTEGER,
      petId: Sequelize.INTEGER,
      estatus: Sequelize.INTEGER,
});



module.exports = Adoptions;