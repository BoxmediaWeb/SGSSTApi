'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleDocumento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleDocumento.belongsTo(models.MaestroDocumento,{foreignKey: 'maestroId'});
      DetalleDocumento.hasMany(models.DocVariables,{foreignKey: 'detalleDocumentoId',onDelete:"cascade"});
    }
  }
  DetalleDocumento.init({
    fecha: DataTypes.STRING,
    maestroId: DataTypes.INTEGER,
    version: DataTypes.INTEGER,
    ubicacion: DataTypes.STRING,
    comentario: DataTypes.STRING,
    usuario: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DetalleDocumento',
    tableName: 'DetalleDocumentos'
  });
  return DetalleDocumento;
};