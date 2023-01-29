'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let roleModulos;

    await queryInterface.sequelize.query(
      'SELECT * FROM Modulos', {
        replacements: ['active'],
        type: queryInterface.sequelize.QueryTypes.SELECT
      }).then(modulos => {

        roleModulos=modulos.map((data)=>{
          return ({
            roleId:1,
            moduloId:data.id
          })
        });

      });

    await queryInterface.bulkInsert('RoleModulos', roleModulos,{});
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
