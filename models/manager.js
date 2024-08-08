'use strict';
// const {user_type, year, gender} = require('./enum.json');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    
    generateToken(){
      const token = jwt.sign({ id: this.id, email : this.email }, process.env.SECRETKEY);
      return token;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Manager.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'managers',
    modelName: 'Manager',
  });
  return Manager;
};