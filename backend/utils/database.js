const Sequelize = require('sequelize');

const sequelize = new Sequelize('express-practice', 'root', 'Mercsl100$', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;