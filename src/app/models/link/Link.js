const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Link = new mongoose.Schema(
  {
    originalLink: {
      type: String,
      required: true,
    },
    shortenedLink: {
      type: String,
      required: true,
    },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Link', Link);
