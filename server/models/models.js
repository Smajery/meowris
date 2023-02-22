const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Memory = sequelize.define("memory", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
})

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Category.hasMany(Memory)
Memory.belongsTo(Category)

User.hasMany(Category)
Category.belongsTo(User)

module.exports = { Memory, Category, User }
