'use strict';
const {model} = require('./enum.json');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.hasMany(models.Question, {
        foreignKey: 'category_id',
        as: 'questions'
      });
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'categories',
    modelName: 'Category',
  });
  return Category;
};