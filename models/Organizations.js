  
'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Organizations.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    social_media: DataTypes.TEXT,
    cellphone: DataTypes.STRING,
    cover: DataTypes.STRING,
    photo: DataTypes.STRING,
    description: DataTypes.TEXT,
    id_user: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Organizations',
  });
  return Organizations;
};