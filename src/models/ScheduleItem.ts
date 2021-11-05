const { Model, DataTypes } = require('sequelize');

export default class ScheduleItem extends Model {
  public allStatus = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELED', 'COMPLETED', 'IN_PROGRESS'];

  static init(sequelize) {
    super.init({
      scheduleId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      status: DataTypes.STRING,
      name: DataTypes.STRING,
      order: DataTypes.INTEGER,
      fileName: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER, 
      isDeleted: DataTypes.BOOLEAN,
    }, { 
      sequelize,
      tableName: 'Schedule_Items'
    });
  }

  static associate(models) {
    this.belongsTo(models.Schedule, { foreignKey: 'scheduleId', as: 'schedule' });

    this.belongsTo(models.User, { foreignKey: 'createdBy', as: 'author' });
    this.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'maintainer' });
  }
}