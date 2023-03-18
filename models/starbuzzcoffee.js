'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class starbuzzcoffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  starbuzzcoffee.init({
    productName: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    imageurl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'starbuzzcoffee',
  });
  return starbuzzcoffee;
};