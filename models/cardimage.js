'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CardImage.hasMany(models.MissionCard, { foreignKey: 'cardImageId' })
      CardImage.belongsTo(models.User, { foreignKey: 'creatorId'})
    }
  };
  CardImage.init({
    creatorId: DataTypes.INTEGER,
    cardImage: DataTypes.STRING,
    isVisible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CardImage',
    tableName: 'CardImages',
    underscored: true,
  });
  return CardImage;
};