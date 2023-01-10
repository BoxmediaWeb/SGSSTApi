'use strict';
const models = require('../models');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfil extends Model {

    static associate(models) {

      Perfil.belongsTo(models.User,{foreignKey:"userId", onDelete:"cascade"});
      
    }

  }
  Perfil.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    tipoDocumento: DataTypes.STRING,
    documento: DataTypes.STRING,
    fecha: DataTypes.STRING,
    cargo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING
  },{
    sequelize,
    modelName: 'Perfil',
    tableName: 'Perfiles'
  });

  return Perfil;
};