const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const Customer=require('./customer.model');
const AddToCart=require('./addTocart.model');
const Review=require('./review.model')

const Laptop = sequelize.define('Laptop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'laptop',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
//Laptop.belongsToMany(Customer, { through: AddToCart });
Laptop.hasMany(Review);
module.exports = Laptop;
