'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init({
    user: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    quantity: DataTypes.STRING,
    starbuzzcoffeeId: DataTypes.INTEGER,
    starbuzzcoffeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'starbuzzcoffee',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};