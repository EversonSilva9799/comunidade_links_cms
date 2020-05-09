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

export default mongoose.model('Rule', Rule);
