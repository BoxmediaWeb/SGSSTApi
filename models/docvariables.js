'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocVariables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DocVariables.belongsTo(models.DetalleDocumento,{foreignKey:"detalleDocumentoId", onDelete:"cascade"});
    }
  }
  DocVariables.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    valor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DocVariables',
    tableName: 'Docvariables'
  });
  return DocVariables;
};