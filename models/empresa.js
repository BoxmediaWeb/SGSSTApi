'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Empresa.init({
    codigo: DataTypes.STRING,
    prefijo: DataTypes.STRING,
    razonSocial: DataTypes.STRING,
    ruc: DataTypes.STRING,
    direccion: DataTypes.STRING,
    celular: DataTypes.STRING,
    web: DataTypes.STRING,
    correo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Empresa',
    tableName: 'Empresas'
  });
  return Empresa;
};