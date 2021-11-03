const { Model, DataTypes } = require('sequelize');

export default class Church extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      isBlocked: DataTypes.BOOLEAN,
      isDeleted: DataTypes.BOOLEAN,
    }, { sequelize });
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'churchId',  as: 'users' });
    this.hasMany(models.Schedule, { foreignKey: 'churchId',  as: 'schedules' });
  }
}