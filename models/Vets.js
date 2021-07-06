'use strict';

const { datatype } = require('faker');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vets extends Model {
   
 
    static associate(models) {
      // define association here
    }
  };
  Vets.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    profile: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    phone: DataTypes.STRING,
    services: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    weekend: DataTypes.BOOLEAN,
    schedule: DataTypes.STRING,
    status: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    account: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vets',
  });
  return Vets;
};