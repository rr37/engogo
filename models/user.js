'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Mission, { foreignKey: 'creatorId' })
      User.hasMany(models.CardImage, { foreignKey: 'creatorId' })
      User.hasMany(models.MissionCard, { foreignKey: 'creatorId' })
      User.hasMany(models.CardCollection, { foreignKey: 'userId' })
      User.hasMany(models.Journal, { foreignKey: 'userId' })
      User.belongsToMany(models.User, { 
        through: models.Followship,
        foreignKey: 'followingUserId',
        as: 'Followings'
      })
      User.belongsToMany(models.User, {
        through: models.Followship,
        foreignKey: 'followedUserId',
        as: 'Followers',
      })
      User.hasMany(models.Like, { foreignKey: userId })
    }
  }
  User.init(
    {
      account: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,
    }
  )
  return User
}
