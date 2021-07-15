'use strict';

const {
  Model, DATE, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
  
    static associate(models) {
      // define association here
    }
  };
  
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.INTEGER,
    city: DataTypes.STRING,
    cellphone: DataTypes.INTEGER,
    invoice_id: DataTypes.INTEGER,
    active: DataTypes.INTEGER,
    expiration: DataTypes.DATE,
    identification: DataTypes.INTEGER,
    share_location: DataTypes.INTEGER,
    googleId: DataTypes.STRING,
    points: DataTypes.INTEGER,
    status  : DataTypes.INTEGER,
    customer: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });

  return Users;
};