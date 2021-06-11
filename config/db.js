const {Sequelize, DataTypes} = require('sequelize');

module.exports = new Sequelize('radi','chikavi','Elradipet10Lt#',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
});
