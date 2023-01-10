'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_Modulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role_Modulo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    hidden: DataTypes.BOOLEAN,
    roleId: DataTypes.INTEGER,
    moduloId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Role_Modulo',
    tableName: 'RoleModulos'
  });
  return Role_Modulo;
};