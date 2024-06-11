// const { Schema } = require('mongoose');
const mongoose = require('../../../services/mongoose');

const UserSchema = new mongoose.Schema(
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
        type: String,
        ref: 'User',
      },
    ],
    following: [
      {
        type: String,
        ref: 'User',
      },
    ],
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
