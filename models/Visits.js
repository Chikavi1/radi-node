'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Visits.init({
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    preasure: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    id_vet: DataTypes.INTEGER,
    id_pet: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Visits',
  });
  return Visits;
};