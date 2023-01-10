'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Permisos', [
      {
        nombre: 'primer permiso',
        descripcion: 'dsfdasfadsfsdafdsfsdfdsf'
      },
      {
        nombre: 'segundo permiso',
        descripcion: 'dsfdasfadsfsdafdsfsdfdsf'
      },
      {
        nombre: 'segundo permiso',
        descripcion: 'dsfdasfadsfsdafdsfsdfdsf'
      },
      {
        nombre: 'segundo permiso',
        descripcion: 'dsfdasfadsfsdafdsfsdfdsf'
      }
  ],{});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
