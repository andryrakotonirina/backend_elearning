'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapitres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chapitres.init({
    Titre: DataTypes.STRING,
    Video: DataTypes.STRING,
    ResumeChapitre: DataTypes.STRING,
    Sequence: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chapitres',
  });
  return Chapitres;
};