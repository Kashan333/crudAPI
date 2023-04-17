const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

class Admin extends Model {}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'admin'
});
sequelize.sync()
  .then(() => {
    console.log('Admin table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table: ', error);
  });
module.exports = Admin;
