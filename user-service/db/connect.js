const { Sequelize } = require('sequelize');

const connectDB = () => {
  const sequelize = new Sequelize('postgres://user:12345678@postgres:5432/db', {
    dialect: 'postgres',
  });

  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  return sequelize;
};

module.exports = connectDB;