  
const {Sequelize, DataTypes} = require('sequelize');

module.exports = new Sequelize('radi','root','12345',{
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
/* module.exports = new Sequelize('radi','checo','Elradipet10Ltñ.',{
    host: '143.198.159.252',
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
}); */