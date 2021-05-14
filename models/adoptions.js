'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adoptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Adoptions.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    identification: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    address: DataTypes.STRING,
    exterior_number: DataTypes.INTEGER,
    interior_number: DataTypes.INTEGER,
    zip: DataTypes.INTEGER,
    neighborhood: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    id_pet: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Adoptions',
  });
  return Adoptions;
};