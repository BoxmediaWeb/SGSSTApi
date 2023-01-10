'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let detalleDocumentos;

    await queryInterface.sequelize.query(
      'SELECT * FROM MaestroDocumentos', {
        replacements: ['active'],
        type: queryInterface.sequelize.QueryTypes.SELECT
      }).then(maestro => {

        const listaDocumento = maestro.filter((data)=>{
          return data.tipoDocumento == "Documento";
        });

        detalleDocumentos = listaDocumento.map((data)=>{
          return ({
            fecha:undefined,
            maestroId:data.id,
            version:undefined,
            ubicacion:undefined,
            comentario:undefined,
            usuario:undefined,
            estado:1
          })
        });

      });

      const detalleDocumentoCreado = await queryInterface.bulkInsert('DetalleDocumentos', detalleDocumentos,{});
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
