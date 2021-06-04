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
    status: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    verified: DataTypes.INTEGER,
    specie: DataTypes.STRING,
    code: DataTypes.STRING,
    geolocation: DataTypes.STRING,
    id_organization: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pets',
  });
  return Pets;
};