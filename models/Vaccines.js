const Sequelize = require('sequelize');
const db = require('../config/db');
const Pets = require('./Pets');


const Vaccines = db.define('vaccines',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(70),
    type: Sequelize.STRING,
    petId: Sequelize.INTEGER,
    estatus: Sequelize.INTEGER(),
});

Vaccines.belongsTo(Pets);


module.exports = Vaccines;