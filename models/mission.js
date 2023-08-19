'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mission.hasMany(models.MissionCard, { foreignKey: 'missionId' })
      Mission.belongsTo(models.User, { foreignKey: 'creatorId' })
    }
  };
  Mission.init({
    creatorId: DataTypes.INTEGER,
    mission: DataTypes.STRING,
    isVisible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Mission',
    tableName: 'Missions',
    underscored: true,
  });
  return Mission;
};
