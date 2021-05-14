'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reservations.init({
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    payment: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    id_vet: DataTypes.STRING,
    id_pet: DataTypes.STRING,
    time: DataTypes.DATE
  }, {
    sequelize: sequelize,
    modelName: 'Reservations',
  });
  return Reservations;
};