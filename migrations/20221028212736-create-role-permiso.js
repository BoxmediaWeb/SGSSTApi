'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Role_Permisos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado: Sequelize.BOOLEAN,
      roleId: {
        type: Sequelize.INTEGER,
        references: { model: 'Roles', key: 'id' },
        onDelete: 'CASCADE',
      },
      permisoId: {
        type: Sequelize.INTEGER,
        references: { model: 'Permisos', key: 'id' },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Role_Permisos');
  }
};