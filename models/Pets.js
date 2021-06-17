'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pets.init({
    description: DataTypes.TEXT,
    id_vacumms: DataTypes.INTEGER,
    size: DataTypes.STRING,
    breed: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    verified: DataTypes.INTEGER,
    specie: DataTypes.STRING,
    photo: DataTypes.STRING,
    code: DataTypes.STRING,
    geolocation: DataTypes.STRING,
    status: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pets',
  });
  return Pets;
};