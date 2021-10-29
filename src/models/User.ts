const { Model, DataTypes } = require('sequelize');

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isBlocked: DataTypes.BOOLEAN,
      isDeleted: DataTypes.BOOLEAN,
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Church, { foreignKey: 'churchId', as: 'organization' });
  }
}