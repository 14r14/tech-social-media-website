const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Posts = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(1000),
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
})

module.exports = Posts;