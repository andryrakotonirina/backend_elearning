'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cours.init({
    NomCours: DataTypes.STRING,
    Prix: DataTypes.STRING,
    ResumeCours: DataTypes.STRING,
    IdMatiereCours: DataTypes.STRING,
    IdUsersTypeEnseignantCours: DataTypes.STRING,
    IdTagsCours: DataTypes.STRING,
    IdChapitreCours: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cours',
  });
  return Cours;
};