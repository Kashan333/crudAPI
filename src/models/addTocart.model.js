const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const Customer = require('./customer.model');

const AddToCart = sequelize.define('AddToCart', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Customer,
      key: 'id'
    }
    
  },
  laptop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Laptop',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = AddToCart;
