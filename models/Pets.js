const Sequelize = require('sequelize');
const db = require('../config/db');


const Pets = db.define('Pets',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
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
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    verified:{
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    estatus: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }
});


module.exports = Pets;