'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NomCours: {
        type: Sequelize.STRING
      },
      Prix: {
        type: Sequelize.STRING
      },
      ResumeCours: {
        type: Sequelize.STRING
      },
      IdMatiereCours: {
        type: Sequelize.STRING
      },
      IdUsersTypeEnseignantCours: {
        type: Sequelize.STRING
      },
      IdTagsCours: {
        type: Sequelize.STRING
      },
      IdChapitreCours: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cours');
  }
};