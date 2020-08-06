const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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
    this.express.use(
      '/images',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  database() {
    let url = 'mongodb://localhost:27017/comunidade';
    mongoose.connect(url, {
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
