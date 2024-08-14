const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:12345678@postgres:5432/db');

const Order = sequelize.define('Order', {
  products: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
  tableName: 'orders',
});

module.exports = Order;