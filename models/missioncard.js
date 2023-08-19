'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MissionCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MissionCard.hasMany(models.CardCollection, { foreignKey: 'missionCardId' })
      MissionCard.hasMany(models.Journal, { foreignKey: 'missionCardId' })
      MissionCard.belongsTo(models.Mission, { foreignKey: 'missionId' })
      MissionCard.belongsTo(models.CardImage, { foreignKey: 'cardImageId' })
      MissionCard.belongsTo(models.User, { foreignKey: 'creatorId' })
    }
  };
  MissionCard.init({
    missionId: DataTypes.INTEGER,
    cardImageId: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER,
    isVisible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'MissionCard',
    tableName: 'MissionCards',
    underscored: true,
  });
  return MissionCard;
};