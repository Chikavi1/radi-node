const Sequelize = require('sequelize');
const db = require('../config/db');
const Organizations = require('./Organizations');
const Usuarios = require('./Usuarios');


const Pets = db.define('pets',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    photo: {
        type: Sequelize.TEXT(),
        allowNull: true
    },
    age: {
        type:Sequelize.INTEGER(11),
        allowNull: true
    },
    city: Sequelize.STRING(40),
    color: {
        type: Sequelize.STRING(25),
        allowNull: true 
    },
    description: Sequelize.TEXT(),
    size: {
        type: Sequelize.STRING,
        allowNull: true
    },
    race: {
        type: Sequelize.STRING,
        allowNull: true
    },
    gender: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    status:  Sequelize.INTEGER(1),
    userId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    verified:{
        type: Sequelize.INTEGER(1),
        allowNull: true
    },
    specie: Sequelize.STRING,
    code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    geolocation: Sequelize.STRING,
    organizationId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
});

Pets.belongsTo(Organizations);
Pets.belongsTo(Usuarios);


module.exports = Pets;