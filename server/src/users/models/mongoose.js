const mongoose = require('../../../services/mongoose');

const User = mongoose.model(
  'User',
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  'users'
);

module.exports = {
  User,
};
