'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // this.hasMany(models.Team, {
      //   foreignKey: 'avatar_id',
      //   as: 'teams'
      // });

    }
  }
  Avatar.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'avatars',
    modelName: 'Avatar',
  });
  return Avatar;
};