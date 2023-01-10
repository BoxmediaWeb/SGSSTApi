'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasOne(models.User,{ foreignKey:"roleId", onDelete:"cascade"});
      Role.belongsToMany(models.Modulo, { through:'Role_Modulo', foreignKey:"roleId"});
      Role.belongsToMany(models.Permiso, { through:'Role_Permiso', foreignKey:"roleId"});
    }
  }
  Role.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles'
  });
  return Role;
};