'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MaestroDocumentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empresaId: {
        type: Sequelize.INTEGER
      },
      vigencia: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      seccion: {
        type: Sequelize.INTEGER
      },
      estandar: {
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nombreCorto: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      tipoDocumento: {
        type: Sequelize.STRING
      },
      enlaceModelo: {
        type: Sequelize.STRING
      },
      sistema: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      },
      extencion: {
        type: Sequelize.STRING
      },
      estado: {
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
    await queryInterface.dropTable('MaestroDocumentos');
  }
};