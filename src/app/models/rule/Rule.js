const mongoose = require('mongoose');

const Rule = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rule', Rule);
