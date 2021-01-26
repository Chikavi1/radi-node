const Sequelize = require('sequelize');
const db = require('../config/db');


const Donations = db.define('donations',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    headline: Sequelize.STRING(100),
    amount :   Sequelize.DECIMAL(6,2),
    message: {
        type:Sequelize.TEXT(),
        allowNull: true
    },
    
});


module.exports = Donations;