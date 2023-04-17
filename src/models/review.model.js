const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
//const Laptop = require('../models/laptop.model');
//const Customer = require('../models/customer.model');
//const Laptop = sequelize.import('../models/laptop.model');
//const Customer = sequelize.import('../models/customer.model');

//const Customer=require('../models/customer.model');


const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  tableName: 'reviews',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

//Review.belongsTo(Laptop, { foreignKey: 'laptop_id' });
// Review.belongsTo(Customer, { foreignKey: 'customer_id',as: 'customer' });

module.exports = Review;
