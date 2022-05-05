const Sequelize = require('sequelize');

const sequelize = new Sequelize('express-practice', 'root', 'PASSWORD', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;
