const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const Customer=require('../models/customer.model');



const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('placed', 'shipped', 'delivered', 'canceled'),
    allowNull: false,
    defaultValue: 'placed'
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'order',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Order.belongsTo(Customer, { foreignKey: 'customer_id' });

sequelize.sync()
  .then(() => {
    console.log('Order table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });

module.exports = Order;
