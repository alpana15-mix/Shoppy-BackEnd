require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch(err => console.log(err));