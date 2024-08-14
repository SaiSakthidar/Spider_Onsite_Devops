const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:12345678@postgres:5432/db');
 const User = sequelize.define('User',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: false,
    tableName: 'User',
});

module.exports = User;