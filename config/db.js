const {Sequelize, DataTypes} = require('sequelize');

module.exports = new Sequelize('radi','root','12345',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
});