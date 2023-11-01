'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Achats.init({
    IdUsersAchats: DataTypes.STRING,
    IdCoursAchats: DataTypes.STRING,
    StatusAchats: DataTypes.STRING,
    Date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Achats',
  });
  return Achats;
};