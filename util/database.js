const Sequelize = require('sequelize');

const sequelize = new Sequelize('hospital', 'root', 'Edithdadi@1', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
