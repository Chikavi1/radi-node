'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};