'use strict';
// require('dotenv').config();
// const jwt = require('jsonwebtoken');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    
    // generateToken(){
    //   const token = jwt.sign({ id: this.id, user : this.user }, process.env.SECRETKEY);
    //   return token;
    // }
    
    static associate(models) {
      // define association here
      this.belongsTo(models.Team, {
        foreignKey: 'team_id',
        as: 'team'
      });
    }
  }
  Player.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'players',
    modelName: 'Player',
  });
  return Player;
};