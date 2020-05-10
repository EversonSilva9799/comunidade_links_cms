const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  database() {
    mongoose.connect('mongodb://localhost:27017/comunidade', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  }

  routes() {
    this.express.use('/api', routes);
  }
}

module.exports = new App().express;
