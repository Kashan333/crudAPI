
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const Laptop=require('./laptop.model');
const Review = require('./review.model');
const AddToCart=require('./addTocart.model')

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'customer',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
//Customer.belongsToMany(Laptop, { through: AddToCart });
Customer.belongsToMany(Laptop, { through: AddToCart });
Laptop.belongsToMany(Customer, { through: AddToCart });
sequelize.sync()
  .then(() => {
    console.log('Customer table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

module.exports = Customer;
