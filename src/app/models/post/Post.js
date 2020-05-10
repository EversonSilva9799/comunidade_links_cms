const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    server: {
      type: String,
      default: '',
    },
    year: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', Post);
