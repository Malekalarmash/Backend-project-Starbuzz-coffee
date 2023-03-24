'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING,
    des: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};