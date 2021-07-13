'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResponseAdoptions extends Model {
    static associate(models) {
    }
  };
  ResponseAdoptions.init({
    title: DataTypes.STRING,
    message: DataTypes.TEXT,
    id_request: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ResponseAdoptions',
  });
  return ResponseAdoptions;
};