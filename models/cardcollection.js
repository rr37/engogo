'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardCollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CardCollection.belongsTo(models.MissionCard, { foreignKey: 'missionCardId' })
      CardCollection.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  CardCollection.init({
    missionCardId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CardCollection',
    tableName: 'CardCollections',
    underscored: true,
  });
  return CardCollection;
};
