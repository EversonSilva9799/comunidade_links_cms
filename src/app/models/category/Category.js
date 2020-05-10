const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', Category);
