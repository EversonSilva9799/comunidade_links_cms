const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

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
    password: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

Post.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', Post);
