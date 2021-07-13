'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestsAdoptions extends Model {
    static associate(models) {
    }
  };
  RequestsAdoptions.init({
    id_user: DataTypes.INTEGER,
    id_pet: DataTypes.INTEGER,
    id_organization: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RequestsAdoptions',
  });
  return RequestsAdoptions;
};