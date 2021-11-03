const { Model, DataTypes } = require('sequelize');

export default class Schedule extends Model {
  public allStatus = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED'];

  static init(sequelize) {
    super.init({
      churchId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      updatedBy: DataTypes.INTEGER,    
      isArchived: DataTypes.BOOLEAN
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Church, { foreignKey: 'churchId', as: 'organization' });
    this.belongsTo(models.User, { foreignKey: 'createdBy', as: 'author' });
    this.belongsTo(models.User, { foreignKey: 'updatedBy', as: 'maintainer' });
  }
}