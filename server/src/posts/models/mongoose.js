const mongoose = require('../../../services/mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  media: {
    type: [String],
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  retweets: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      textContent: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  hashtags: {
    type: [String],
    default: [],
  },
  mentions: {
    type: [String],
    default: [],
  },
});

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
