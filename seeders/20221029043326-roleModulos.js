'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('RoleModulos', [
      {
        roleId: 1,
        moduloId: 1
      },
      {
        roleId: 1,
        moduloId: 2
      },
      {
        roleId: 1,
        moduloId: 3
      },
      {
        roleId: 1,
        moduloId: 4
      },
      {
        roleId: 1,
        moduloId: 5
      },
      {
        roleId: 1,
        moduloId: 6
      },
      {
        roleId: 1,
        moduloId: 7
      },
      {
        roleId: 1,
        moduloId: 8
      },
      {
        roleId: 1,
        moduloId: 9
      },
      {
        roleId: 1,
        moduloId: 10
      },
      {
        roleId: 1,
        moduloId: 11
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
