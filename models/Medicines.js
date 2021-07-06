'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Medicines.init({
    name:       DataTypes.STRING,
    treatment:  DataTypes.STRING,
    unit:       DataTypes.INTEGER,
    status:     DataTypes.INTEGER,
    id_user:    DataTypes.INTEGER,
    id_visit:   DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicines',
  });
  return Medicines;
};