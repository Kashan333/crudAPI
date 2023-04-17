const Sequelize = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('techstore', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
module.exports = sequelize ;