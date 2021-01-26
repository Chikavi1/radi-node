const Sequelize = require('sequelize');
const db = require('../config/db');


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
    vacumms_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    userId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    verified:{
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    estatus:  Sequelize.INTEGER(11),
});


module.exports = Pets;