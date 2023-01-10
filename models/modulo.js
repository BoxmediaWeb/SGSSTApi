'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Modulo.belongsToMany(models.Role, { through:'Role_Modulo', foreignKey:"moduloId"});
    }
  }
  Modulo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    parent: DataTypes.STRING,
    icon: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Modulo',
    tableName: 'Modulos'
  });
  return Modulo;
};