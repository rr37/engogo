'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal.hasMany(models.Like, { foreignKey: 'journalId' })
      Journal.belongsTo(models.User, { foreignKey: 'userId' })
      Journal.belongsTo(models.MissionCard, { foreignKey: 'missionCardId' })
    }
  };
  Journal.init(
    {
      date: DataTypes.DATE,
      weather: DataTypes.STRING,
      q1: DataTypes.STRING,
      q2: DataTypes.STRING,
      q3: DataTypes.STRING,
      listen: DataTypes.INTEGER,
      speak: DataTypes.INTEGER,
      read: DataTypes.INTEGER,
      write: DataTypes.INTEGER,
      think: DataTypes.INTEGER,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      missionCardId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Journal',
      tableName: 'Journals',
      underscored: true,
    }
  )
  return Journal;
};