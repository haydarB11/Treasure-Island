'use strict';
const { type } = require('./enum.json');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });
      this.hasMany(models.Answer, {
        foreignKey: 'question_id',
        as: 'answers',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    }
  }
  Question.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    showed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    type: {
      type: DataTypes.ENUM,
      values: type,
      defaultValue: 'turbo',
      allowNull: false,
    },
    // mark: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
  }, {
    sequelize,
    underscored: true,
    tableName: 'questions',
    modelName: 'Question',
  });
  return Question;
};