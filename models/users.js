'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
// Cart items belong to cart
// User has many carts 
// cart belong to a user  
// Product has many cart items
// CartItem is an instance of a prodcut that has been added to the cart 
npx sequelize - cli model: generate--name User--attributes firstName: string, lastName: string, email: string
