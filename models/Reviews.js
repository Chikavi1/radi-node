'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reviews.init({
    id_vet: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    commment: DataTypes.TEXT,
    date: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};