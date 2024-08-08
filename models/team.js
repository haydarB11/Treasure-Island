'use strict';
const { status } = require('./enum.json');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    
    // generateToken(){
    //   const token = jwt.sign({ id: this.id, user : this.user }, process.env.SECRETKEY);
    //   return token;
    // }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Player, {
        foreignKey: 'team_id',
        as: 'players'
      });
      // this.belongsTo(models.Avatar, {
      //   foreignKey: 'avatar_id',
      //   as: 'avatar'
      // });
    }
  }
  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: status,
      defaultValue: 'pending',
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'teams',
    modelName: 'Team',
  });
  return Team;
};