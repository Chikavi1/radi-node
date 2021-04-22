const Sequelize = require('sequelize');
const db = require('../config/db');


const Organizations = db.define('organizations',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(70),
    address: Sequelize.STRING,
    social_media: Sequelize.TEXT,
    cellphone: Sequelize.INTEGER(11),
    cover: Sequelize.STRING,
    photo: Sequelize.STRING,
    description: Sequelize.TEXT,
    user_id: Sequelize.INTEGER(),
});


module.exports = Organizations;