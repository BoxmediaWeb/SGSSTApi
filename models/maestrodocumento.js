'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaestroDocumento extends Model {

    static associate(models) {
      MaestroDocumento.hasMany(models.DetalleDocumento,{foreignKey: 'maestroId'});
    }
  }
  MaestroDocumento.init({
    empresaId: DataTypes.INTEGER,
    vigencia: DataTypes.STRING,
    codigo: DataTypes.STRING,
    seccion: DataTypes.INTEGER,
    estandar: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    nombreCorto: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    tipoDocumento: DataTypes.STRING,
    enlaceModelo: DataTypes.STRING,
    sistema: DataTypes.STRING,
    observaciones: DataTypes.STRING,
    extencion: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MaestroDocumento',
    tableName: 'MaestroDocumentos'
  });
  return MaestroDocumento;
};