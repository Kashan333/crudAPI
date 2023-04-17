const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
}, {
  tableName: 'inventory',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Inventory;
