'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Isolations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Isolations.init({
    time_start: DataTypes.DATE,
    time_end: DataTypes.DATE,
    id_vet: DataTypes.STRING,
    weekend: DataTypes.BOOLEAN,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Isolations',
  });
  return Isolations;
};