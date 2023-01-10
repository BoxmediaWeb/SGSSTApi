'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Users', [{
         name: 'Admin Box',
         avatar: null,
         nick: 'admin-box',
         password:'1234567',
         email:'admin@soyasesorias.com',
         status:'creado',
         roleId: 1
       }],{});

      await queryInterface.bulkInsert('Perfiles', [{
        nombres: 'Admin',
        apellidos: 'Box',
        tipoDocumento: 'cc',
        documento:'000000',
        userId: 1
      }],{});

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
