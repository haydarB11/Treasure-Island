'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Advertisement.init({
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'advertisements',
    modelName: 'Advertisement',
  });
  return Advertisement;
};