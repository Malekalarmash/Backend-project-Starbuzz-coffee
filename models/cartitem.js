'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cartItem.belongsTo(models.product);
      cartItem.belongsTo(models.cart);
      cartItem.sync()
    }
  }
  cartItem.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cartItem',
  });
  return cartItem;
};