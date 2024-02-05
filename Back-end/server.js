require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./Routes/userRoute.js');
const productRoute = require('./Routes/productRoute.js');
const orderRoute = require('./Routes/orderRoute.js');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
    startServer();
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });

function startServer() {
  app.use('/user', userRoute);
  app.use('/api', productRoute);
  app.use('/order', orderRoute);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
