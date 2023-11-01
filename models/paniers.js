'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paniers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paniers.init({
    IdUsersPaniers: DataTypes.STRING,
    IdCoursPaniers: DataTypes.STRING,
    StatusPaniers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paniers',
  });
  return Paniers;
};