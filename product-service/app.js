const express = require("express")
const app = express();
const connectDB = require('./db/connect.js')
app.use(express.json());
require('dotenv').config({ path: '/.env' });
const amqplib = require("amqplib");
const Product  = require('./models/productService.js');

app.use('/product', authService)

var channel, connection, order;

 async function connect() {
   connection = await amqplib.connect('amqp://host.docker.internal:5672')
   channel= await connection.createChannel();
  await channel.assertQueue("PRODUCT", {durable: false});

}
connect();

app.post('/product/buy', async (req,res) => {

  const { ids } = req.body;
  const products = await Product.find({ _id: { $in: ids } });

  channel.sendToQueue(
      "ORDER", 
      Buffer.from(
          JSON.stringify({
              products,
              userEmail: req.user,
          })
      )
  )
  channel.consume("PRODUCT", data => {
    console.log("Consuming PRODUCT queue")
    order = JSON.parse(data.content);   
    channel.ack(data); 
  })
  return res.json(order);
})


const { sequelize } = require('./models/productService.js'); 

const start = async () => {
  try {
      await sequelize.authenticate(); 
      console.log('Connection to PostgreSQL has been established successfully.');
      await sequelize.sync(); 
      app.listen(3002, () => console.log('Server is listening on port 3002...'));
  } catch (error) {
      console.log(error);
  }
}

start();