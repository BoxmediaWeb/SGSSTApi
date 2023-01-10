'use strict';

const maestroDocumentoJs = require('../public/javascripts/maestros');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let maestroDocumento=[];

    maestroDocumentoJs.forEach((data)=>{
      maestroDocumento.push({
        empresaId:1,
        codigo:data.codigo,
        tipoDocumento:data.tipo_documento,
        vigencia:data.vigencia,
        seccion:data.seccion,
        estandar:data.estandar,
        nombre:data.nombre,
        nombreCorto:data.nombre_corto,
        ubicacion:data.ubicacion,
        tipoDocumento:data.tipo_documento,
        enlaceModelo:data.enlace_modelo,
        sistema:data.sistema,
        observaciones:data.observaciones,
        extencion:data.extencion,
        estado:data.estado
      });
    });

    const maestroDocumentoCreado = await queryInterface.bulkInsert('MaestroDocumentos', maestroDocumento,{});

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
