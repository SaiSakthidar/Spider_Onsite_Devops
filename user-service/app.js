const express = require("express")
const app = express();
const connectDB = require('./db/connect.js')
const authService = require('./routes/authService.js')
app.use(express.json());
require('dotenv').config({ path: '/.env' });

app.use('/users', authService)

const { sequelize } = require('./models/authService.js'); 

const start = async () => {
  try {
      await sequelize.authenticate(); 
      console.log('Connection to PostgreSQL has been established successfully.');
      await sequelize.sync(); 
      app.listen(3002, () => console.log('Server is listening on port 3001...'));
  } catch (error) {
      console.log(error);
  }
}

start();